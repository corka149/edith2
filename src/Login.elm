module Main exposing (Credentials, Msg(..), init, main, subscriptions, update, view)

import Bootstrap.Button as BsButton
import Bootstrap.CDN as BsCDN
import Bootstrap.Grid as BsGrid
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onSubmit)
import Http
import Json.Encode as EN



-- MAIN


main =
    Browser.element { init = init, update = update, subscriptions = subscriptions, view = view }



-- MODEL


type alias Credentials =
    { email : String, password : String }


init : () -> ( Credentials, Cmd Msg )
init _ =
    ( { email = "", password = "" }, Cmd.none )



-- UPDATE


type Msg
    = TryLogin
    | GotLoginResponse (Result Http.Error ())
    | Email String
    | Password String


update : Msg -> Credentials -> ( Credentials, Cmd Msg )
update msg credentials =
    case msg of
        Email email ->
            ( { credentials | email = email }, Cmd.none )

        Password password ->
            ( { credentials | password = password }, Cmd.none )

        TryLogin ->
            ( credentials, tryLogin credentials )

        GotLoginResponse _ ->
            ( credentials, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Credentials -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


view : Credentials -> Html Msg
view model =
    BsGrid.container []
        [ BsCDN.stylesheet -- creates an inline style node with the Bootstrap CSS
        , BsGrid.row []
            [ BsGrid.col []
                [ Html.form
                    [ style "background-color" "#ff9900"
                    , style "border-radius" "10px"
                    , class "py-2"
                    , onSubmit TryLogin
                    ]
                    [ div [ class "form-group", class "py-2", class "px-4" ]
                        [ label [ for "emailinput" ] [ text "E-Mail" ]
                        , input
                            [ id "emailinput"
                            , placeholder "E-Mail"
                            , class "form-control"
                            , type_ "email"
                            , required True
                            , name "email"
                            , onInput Email
                            ]
                            []
                        ]
                    , div [ class "form-group", class "py-2", class "px-4" ]
                        [ label [ for "passwordinput" ] [ text "Password" ]
                        , input
                            [ id "passwordinput"
                            , placeholder "Password"
                            , class "form-control"
                            , type_ "password"
                            , required True
                            , name "password"
                            , onInput Password
                            ]
                            []
                        ]
                    , div [ class "py-2", class "px-4", class "d-flex", class "justify-content-end" ]
                        [ BsButton.button [ BsButton.primary, BsButton.attrs [] ] [ text "Submit" ]
                        ]
                    ]
                ]
            ]
        ]



-- HTTP


tryLogin : Credentials -> Cmd Msg
tryLogin credentials =
    Http.post
        { url = "/jarvis/auth/signin"
        , expect = Http.expectWhatever GotLoginResponse
        , body = Http.jsonBody <| credentialsEncoder credentials
        }



-- ENCODER


credentialsEncoder credentials =
    EN.object
        [ ( "email", EN.string credentials.email )
        , ( "password", EN.string credentials.password )
        ]
