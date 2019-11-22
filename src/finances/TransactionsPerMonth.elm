module TransactionsPerMonth exposing (Category, Msg(..), init, main, subscriptions, update, view)

import Bootstrap.Button as BsButton
import Bootstrap.CDN as BsCDN
import Bootstrap.Grid as BsGrid
import Browser
import FontAwesome.Icon as Icon
import FontAwesome.Solid as Icon
import FontAwesome.Styles as Icon
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, onSubmit)
import Http
import Json.Decode as DE
import Json.Encode as JE
import Task
import Time exposing (..)



-- MAIN


main =
    Browser.element { init = init, update = update, subscriptions = subscriptions, view = view }



-- MODEL


type alias Category =
    { id : Int, name : String }


type alias Transaction =
    { id : Int, description : String, executedOn : Time.Posix, recurring : Bool, value : Float, categoryId : Int }


type alias Model =
    { transactions : List Transaction, month : Month }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { transactions = [], month = Jan }, getCurrentMonth )



-- UPDATE


type Msg
    = CurrentMonth Month


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        CurrentMonth currentMonth ->
            ( { model | month = currentMonth }, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


view : Model -> Html Msg
view model =
    div [] [ text <| String.fromInt <| numericMonth model.month ]



-- UTILS


getCurrentMonth : Cmd Msg
getCurrentMonth =
    Task.perform CurrentMonth (Task.map2 Time.toMonth Time.here Time.now)


numericMonth : Time.Month -> Int
numericMonth month =
    case month of
        Jan ->
            1

        Feb ->
            2

        Mar ->
            3

        Apr ->
            4

        May ->
            5

        Jun ->
            6

        Jul ->
            7

        Aug ->
            8

        Sep ->
            9

        Oct ->
            10

        Nov ->
            11

        Dec ->
            12
