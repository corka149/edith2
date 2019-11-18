module Main exposing (Model, Msg(..), init, main, subscriptions, update, view)

import Bootstrap.Button as BsButton
import Bootstrap.CDN as BsCDN
import Bootstrap.Grid as BsGrid
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)



-- MAIN


main =
    Browser.element { init = init, update = update, subscriptions = subscriptions, view = view }



-- MODEL


type alias Model =
    { password : String, confirmPassword : String }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { password = "", confirmPassword = "" }, Cmd.none )



-- UPDATE


type Msg
    = Password String
    | ConfirmPassword String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Password password ->
            ( { model | password = password}, Cmd.none )

        ConfirmPassword confirmPassword ->
            ( { model | confirmPassword = confirmPassword }, Cmd.none )



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
                    , class "py-2"
                    , action "/jarvis/v1/accounts/users"
                    , method "post"
                    ]
                    [ div [ class "form-group", class "py-2", class "px-4" ]
                        [ label [ for "emailinput" ] [ text "E-Mail" ]
                        , input [ id "emailinput", placeholder "E-Mail", class "form-control", type_ "email", required True, name "email" ] []
                        ]
                    , div [ class "form-group", class "py-2", class "px-4" ]
                        [ label [ for "nameinput" ] [ text "Name" ]
                        , input [ id "nameinput", placeholder "Name", class "form-control", type_ "text", required True, name "name" ] []
                        ]
                    , div [ class "form-group", class "py-2", class "px-4" ]
                        [ label [ for "passwordinput" ] [ text "Password" ]
                        , input [ id "passwordinput", placeholder "Password", class "form-control", type_ "password", required True, name "password", onInput Password ] []
                        , small [ class "form-text", class "text-muted" ] [ text "Password requires at least: Two upper characters, two lower characters, 2 digits and special characters." ]
                        ]
                    , div [ class "form-group", class "py-2", class "px-4" ]
                        [ label [ for "confirmPasswordinput" ] [ text "Confirm Password" ]
                        , input [ id "confirmPasswordinput", placeholder "Confirm Password", class "form-control", type_ "password", required True, onInput ConfirmPassword ] []
                        , showMatchingHint model
                        ]
                    , div [ class "py-2", class "px-4", class "d-flex", class "justify-content-end" ]
                        [ BsButton.button [ BsButton.primary, BsButton.attrs [] ] [ text "Submit" ]
                        ]
                    ]
                ]
            ]
        ]



-- UTILS


showMatchingHint model =
    if model.password == model.confirmPassword then
        small [] [ text "\u{00A0}"]
    else
        small [ class "form-text", style "color" "red" ] [ text "Passwords do not match." ]
