module CategoryView exposing (Category, Msg(..), init, main, subscriptions, update, view)

import Bootstrap.Button as BsButton
import Bootstrap.CDN as BsCDN
import Bootstrap.Grid as BsGrid
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, onSubmit)
import Http
import Json.Decode as DE
import Json.Encode as JE



-- MAIN


main =
    Browser.element { init = init, update = update, subscriptions = subscriptions, view = view }



-- MODEL


type alias Category =
    { id : Maybe Int, name : String, readOnly : Bool }


type alias CategoryDTO =
    { id : Int, name : String }


init : () -> ( Category, Cmd Msg )
init _ =
    ( { id = Nothing, name = "", readOnly = False }, Cmd.none )



-- UPDATE


type Msg
    = Name String
    | CreateOrUpdateCategory
    | GotCategory (Result Http.Error CategoryDTO)
    | ToggleReadOnly


update : Msg -> Category -> ( Category, Cmd Msg )
update msg category =
    case msg of
        Name name ->
            ( { category | name = name }, Cmd.none )

        CreateOrUpdateCategory ->
            ( category, sendCategory category )

        GotCategory result ->
            case result of
                Ok receivedCategory ->
                    ( fromDTO category receivedCategory, Cmd.none )

                Err _ ->
                    ( category, Cmd.none )

        ToggleReadOnly ->
            ( { category | readOnly = not category.readOnly }, Cmd.none )



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
                    , class "py-2"
                    , onSubmit CreateOrUpdateCategory
                    ]
                    [ h2 [ class "py-2", class "px-4" ] [ text "Category" ]
                    , viewId category
                    , viewName category
                    , div [ class "py-2", class "px-4", class "d-flex", class "justify-content-end" ]
                        [ viewEdit category
                        , BsButton.button [ BsButton.primary, BsButton.attrs [ style "margin-left" "0.5rem" ] ] [ text "Save" ]
                        ]
                    ]
                ]
            ]
        ]


viewEdit category =
    case category.id of
        Just _ ->
            BsButton.button [ BsButton.secondary, BsButton.attrs [ onClick ToggleReadOnly ] ] [ text "Edit" ]

        Nothing ->
            span [] []


viewId : Category -> Html Msg
viewId category =
    case category.id of
        Just categoryId ->
            div [ class "form-group", class "row", class "py-2", class "px-4" ]
                [ label [ for "idinput", class "col-sm-3", class "col-form-label" ] [ text "Id" ]
                , div [ class "col-sm-9" ]
                    [ input
                        [ id "idinput"
                        , placeholder "Id"
                        , class
                            (if category.readOnly then
                                "form-control-plaintext"

                             else
                                "form-control"
                            )
                        , type_ "text"
                        , value (String.fromInt categoryId)
                        , disabled True
                        , readonly True
                        ]
                        []
                    ]
                ]

        Nothing ->
            div [] []


viewName category =
    div [ class "form-group", class "row", class "py-2", class "px-4" ]
        [ label [ for "nameinput", class "col-sm-3", class "col-form-label" ] [ text "Name" ]
        , div [ class "col-sm-9" ]
            [ input
                ([ id "nameinput"
                 , placeholder "Name"
                 , type_ "text"
                 , required True
                 , value category.name
                 ]
                    ++ switchReadOnlyOrInput category.readOnly
                )
                []
            ]
        ]


switchReadOnlyOrInput readOnly =
    if readOnly then
        [ disabled True, readonly True, class "form-control-plaintext" ]

    else
        [ class "form-control", onInput Name ]



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
        , headers = []
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


fromDTO : Category -> CategoryDTO -> Category
fromDTO oldCategory categoryDTO =
    { id = Just categoryDTO.id, name = categoryDTO.name, readOnly = oldCategory.readOnly }



-- ENCODE


categoryEncoder category =
    JE.object
        [ ( "category", categoryAttributeEncoder category ) ]


categoryAttributeEncoder category =
    JE.object
        [ ( "name", JE.string category.name ) ]



-- DECODE


categoryDecoder : DE.Decoder CategoryDTO
categoryDecoder =
    DE.field "category" categoryAttributeDecoder


categoryAttributeDecoder =
    DE.map2 CategoryDTO
        (DE.field "id" DE.int)
        (DE.field "name" DE.string)
