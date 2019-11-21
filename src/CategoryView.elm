module CategoryView exposing (Category, Msg(..), init, main, subscriptions, update, view)

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


type alias Category =
    { id : Maybe Int, name : String }


init : () -> ( Category, Cmd Msg )
init _ =
    ( { id = Nothing, name = "" }, Cmd.none )



-- UPDATE


type Msg
    = Name String
    | CreateOrUpdateCategory
    | GotCategory (Result Http.Error Category)


update : Msg -> Category -> ( Category, Cmd Msg )
update msg category =
    case msg of
        Name name ->
            ({ category | name = name}, Cmd.none)    
        CreateOrUpdateCategory ->
            ( category, sendCategory category)
        GotCategory result ->
            case result of
                Ok receivedCategory ->
                    ( receivedCategory, Cmd.none)            
                Err _ ->
                    ( category, Cmd.none)



-- SUBSCRIPTIONS


subscriptions : Category -> Sub Msg
subscriptions category =
    Sub.none



-- VIEW


view : Category -> Html Msg
view category =
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
                    [ h2 [ class "py-2", class "px-4" ] [ text "Category" ]
                    , showId category                        
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


showId : Category -> Html Msg
showId category =
    case category.id of
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


sendCategory : Category -> Cmd Msg
sendCategory category =
    case category.id of
        Just categoryId ->
            updateCategory category categoryId
        Nothing ->
            createCategory category


updateCategory : Category -> Int -> Cmd Msg
updateCategory category categoryId =
    Http.request
    { method = "PUT"
    , headers = [ ]
    , url = "/jarvis/v1/finances/categories/" ++ String.fromInt categoryId
    , body = Http.jsonBody <| categoryEncoder category
    , expect = Http.expectJson GotCategory categoryAttributeDecoder
    , timeout = Nothing
    , tracker = Nothing
    }


createCategory : Category -> Cmd Msg
createCategory category =
    Http.post
    { url = "/jarvis/v1/finances/categories"
    , body = Http.jsonBody <| categoryEncoder category
    , expect = Http.expectJson GotCategory categoryAttributeDecoder
    }



-- ENCODE


categoryEncoder category =
    JE.object
    [ ("category", categoryAttributeEncoder category) ]


categoryAttributeEncoder category =
    JE.object
    [ ("name", JE.string category.name)]



-- DECODE


categoryDecoder : DE.Decoder Category
categoryDecoder = 
    DE.field "category" (categoryAttributeDecoder)


categoryAttributeDecoder =
    DE.map2 Category
        (DE.maybe (DE.field "id" DE.int))
        (DE.field "name" DE.string)
