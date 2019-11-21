module CategoryView exposing (Model, Msg(..), init, main, subscriptions, update, view)

import Bootstrap.Button as BsButton
import Bootstrap.CDN as BsCDN
import Bootstrap.Grid as BsGrid
import Browser
import Html exposing (..)
import Html.Events exposing (onInput, onSubmit)
import Html.Attributes exposing (..)
import Http
import Json.Encode as JE
import Json.Decode as DE



-- MAIN


main =
    Browser.element { init = init, update = update, subscriptions = subscriptions, view = view }



-- MODEL


type alias Model =
    { id : Maybe Int, name : String }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { id = Nothing, name = "" }, Cmd.none )



-- UPDATE


type Msg
    = Name String
    | CreateOrUpdateCategory
    | GotCategory (Result Http.Error Model)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Name name ->
            ({ model | name = name}, Cmd.none)    
        CreateOrUpdateCategory ->
            ( model, sendCategory model)
        GotCategory result ->
            case result of
                Ok receivedCategory ->
                    ( receivedCategory, Cmd.none)            
                Err _ ->
                    ( model, Cmd.none)



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


view : Model -> Html Msg
view model =
    BsGrid.container []
        [ BsCDN.stylesheet -- creates an inline style node with the Bootstrap CSS
        , BsGrid.row []
            [ BsGrid.col []
                [ Html.form
                    [ style "background-color" "#ff9900"
                    , style "border-radius" "10px"
                    , class "py-2",
                    onSubmit CreateOrUpdateCategory
                    ]
                    [ showId model                        
                    , div [ class "form-group", class "py-2", class "px-4" ]
                        [ label [ for "nameinput" ] [ text "Name" ]
                        , input [ id "nameinput", placeholder "Name"
                                , class "form-control", type_ "text", required True 
                                , onInput Name
                                ] []
                        ]
                    , div [ class "py-2", class "px-4", class "d-flex", class "justify-content-end" ]
                        [ BsButton.button [ BsButton.primary, BsButton.attrs [] ] [ text "Submit" ]
                        ]
                    ]
                ]
            ]
        ]



-- UTILS


showId : Model -> Html Msg
showId model =
    case model.id of
        Just categoryId ->
            div [ class "form-group", class "py-2", class "px-4" ]
                        [ label [ for "idinput" ] [ text "Id" ]
                        , input [ id "idinput", placeholder "Id"
                                , class "form-control", type_ "text", value(String.fromInt categoryId)
                                , onInput Name, disabled True, readonly True
                                ] []
                        ]   
        Nothing ->
            div [] []



-- HTTP


sendCategory : Model -> Cmd Msg
sendCategory model =
    case model.id of
        Just categoryId ->
            updateCategory model categoryId
        Nothing ->
            createCategory model


updateCategory : Model -> Int -> Cmd Msg
updateCategory model categoryId =
    Http.request
    { method = "PUT"
    , headers = [ ]
    , url = "/jarvis/v1/finances/categories/" ++ String.fromInt categoryId
    , body = Http.jsonBody <| categoryEncoder model
    , expect = Http.expectJson GotCategory categoryAttributeDecoder
    , timeout = Nothing
    , tracker = Nothing
    }


createCategory : Model -> Cmd Msg
createCategory model =
    Http.post
    { url = "/jarvis/v1/finances/categories"
    , body = Http.jsonBody <| categoryEncoder model
    , expect = Http.expectJson GotCategory categoryAttributeDecoder
    }



-- ENCODE


categoryEncoder model =
    JE.object
    [ ("category", categoryAttributeEncoder model) ]


categoryAttributeEncoder model =
    JE.object
    [ ("name", JE.string model.name)]



-- DECODE


categoryDecoder : DE.Decoder Model
categoryDecoder = 
    DE.field "category" (categoryAttributeDecoder)


categoryAttributeDecoder =
    DE.map2 Model
        (DE.maybe (DE.field "id" DE.int))
        (DE.field "name" DE.string)
