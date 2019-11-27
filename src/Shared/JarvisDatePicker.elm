module Shared.JarvisDatePicker exposing (..)

--
-- Inspired from bootstrap example https://package.elm-lang.org/packages/CurrySoftware/elm-datepicker/latest/
--

import Bootstrap.CDN as BsCDN
import Browser
import Date exposing (Date, day, month, weekday, year)
import DatePicker exposing (DateEvent(..), defaultSettings)
import Html exposing (Html, div, form, h1, input, label, text)
import Html.Attributes exposing (class, type_, value)
import Time exposing (Weekday(..))
import VirtualDom exposing (attribute, node)



-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }



-- MODEL


type alias Model =
    { date : Maybe Date
    , datePicker : DatePicker.DatePicker
    }


settings : DatePicker.Settings
settings =
    { defaultSettings
        | inputClassList = [ ( "form-control", True ) ]
        , inputName = Just "date"
        , inputId = Just "date-field"
    }


init : ( Model, Cmd Msg )
init =
    let
        ( datePicker, datePickerFx ) =
            DatePicker.init
    in
    ( { date = Nothing
      , datePicker = datePicker
      }
    , datePickerFx
    )



-- UPDATE


type alias Msg =
    DatePicker.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        ( newDatePicker, event ) =
            DatePicker.update settings msg model.datePicker
    in
    ( { model
        | date = changeDateOnEvent model event
        , datePicker = newDatePicker
      }
    , Cmd.none
    )


changeDateOnEvent model event =
    case event of
        Picked date ->
            Just date

        _ ->
            model.date



-- VIEW


view : Model -> Html Msg
view ({ date, datePicker } as model) =
    div [ class "col-md-3" ]
        [ BsCDN.stylesheet -- creates an inline style node with the Bootstrap CSS
        , datePickerCss
        , form []
            [ div [ class "form-group" ]
                [ label [] [ text "Pick a date" ]
                , DatePicker.view date settings datePicker
                ]
            , input
                [ type_ "submit"
                , class "btn btn-primary"
                , value "Submit"
                ]
                []
            ]
        ]


datePickerCss =
    node "link" [ attribute "rel" "stylesheet", attribute "href" "/static/css/jarvis.css" ] []



-- UTILS
