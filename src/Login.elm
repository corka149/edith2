import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Bootstrap.CDN as BsCDN
import Bootstrap.Grid as BsGrid
import Bootstrap.Button as BsButton


-- MAIN


main =
    Browser.element { init = init, update = update, subscriptions = subscriptions , view = view }


-- MODEL

type alias Credentials = 
    {
        email : String
        , password : String
    }

type Model
    = Unauthenticated
    | RequestAuthentication Credentials
    | Authenticated

init : () -> (Model, Cmd Msg)
init _ = 
    (Unauthenticated, Cmd.none)


-- UPDATE

type Msg = GotText (Result Http.Error String)

update msg model = 
    (Unauthenticated, Cmd.none)


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
                [
                    Html.form [ style "background-color" "#ff9900", style "border-radius" "25px", class "py-2" ] [
                        div [ class "form-group", class "py-2", class "px-4" ] [
                            label [ for "emailinput" ] [ text "E-Mail" ],
                            input [ id "emailinput", placeholder "E-Mail", class "form-control", type_ "email", required True ] []
                        ],
                        div [ class "form-group", class "py-2", class "px-4" ] [
                            label [ for "passwordinput" ] [ text "Password" ],
                            input [ id "passwordinput", placeholder "Password", class "form-control", type_ "password", required True ] []
                        ],
                        div [ class "py-2", class "px-4", class "d-flex", class "justify-content-end" ] [
                            BsButton.button [ BsButton.primary, BsButton.attrs [ type_ "button" ] ] [ text "Submit" ]
                        ]
                    ]
                ]
            ]

        ]
