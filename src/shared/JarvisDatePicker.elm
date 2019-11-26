module JarvisDatePicker exposing (main)
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
import VirtualDom exposing (node, attribute)



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
    , Cmd.map ToDatePicker datePickerFx
    )



-- UPDATE


type Msg
    = ToDatePicker DatePicker.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ datePicker } as model) =
    case msg of
        ToDatePicker subMsg ->
            let
                ( newDatePicker, event ) =
                    DatePicker.update settings subMsg datePicker
            in
            ( { model
                | date =
                    case event of
                        Picked date ->
                            Just date

                        _ ->
                            model.date
                , datePicker = newDatePicker
              }
            , Cmd.none
            )



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
                    |> Html.map ToDatePicker
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
    node "link" [ attribute "rel" "stylesheet", attribute "href" "/static/css/jarvis.css"] []
