import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Http
import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid


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
    Grid.container []
        [ CDN.stylesheet -- creates an inline style node with the Bootstrap CSS
        , Grid.row []
            [ Grid.col []
                [ text "Some content for my view here..."]
            ]

        ]
