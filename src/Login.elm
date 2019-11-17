module Main exposing (Model, Msg(..), init, main, subscriptions, update, view)

import Bootstrap.Button as BsButton
import Bootstrap.CDN as BsCDN
import Bootstrap.Grid as BsGrid
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)
import Http
import Json.Encode as JE



-- MAIN


main =
    Browser.element { init = init, update = update, subscriptions = subscriptions, view = view }



-- MODEL


type alias Model =
    { email : String
    , password : String
    , authenticated : Bool
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { email = "", password = "", authenticated = False }, Cmd.none )



-- UPDATE


type Msg
    = GotText (Result Http.Error String)
    | Password String
    | Email String
    | TryAuthentication


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        Email email ->
            ( { model | email = email}, Cmd.none)                
        Password password ->
            ( { model | password = password}, Cmd.none)
        GotText result ->
            case result of
                Ok responseText ->
                    ( { model | authenticated = True}, Cmd.none)            
                Err _ ->
                    ( { model | authenticated = False}, Cmd.none)
        TryAuthentication  ->
            (model, postCredentials model.email model.password)



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
                [ Html.form [ style "background-color" "#ff9900", style "border-radius" "25px", class "py-2" ]
                    [ div [ class "form-group", class "py-2", class "px-4" ]
                        [ label [ for "emailinput" ] [ text "E-Mail" ]
                        , input [ id "emailinput", placeholder "E-Mail", class "form-control", type_ "email", required True, onInput Email ] []
                        ]
                    , div [ class "form-group", class "py-2", class "px-4" ]
                        [ label [ for "passwordinput" ] [ text "Password" ]
                        , input [ id "passwordinput", placeholder "Password", class "form-control", type_ "password", required True, onInput Password ] []
                        ]
                    , div [ class "py-2", class "px-4", class "d-flex", class "justify-content-end" ]
                        [ BsButton.button [ BsButton.primary, BsButton.attrs [ type_ "button", onClick TryAuthentication ] ] [ text "Submit" ]
                        ]
                    ]
                ]
            ]
            , text (isAuthenticated model.authenticated)
        ]



-- UTILS


isAuthenticated authenticated = 
    case authenticated of
        True ->
            "Is authenticated"    
        False ->
            "Unauthenticated"


postCredentials : String -> String -> Cmd Msg
postCredentials email password =
    Http.post
    { url = "http://localhost:4000/auth/signin"
    , body = Http.jsonBody <| credentialsEncoder email password
    , expect = Http.expectString GotText
    }


credentialsEncoder email password =
    JE.object [ ("email", JE.string email)
    ,    ("password", JE.string password)
    ]
