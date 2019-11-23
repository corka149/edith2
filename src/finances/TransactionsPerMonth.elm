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
import Html.Events exposing (onClick, onInput, onSubmit, onCheck)
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
    { id : Maybe Int, description : String, executedOn : Maybe Time.Posix, recurring : Bool, value : Float, categoryId : Maybe Int }


type alias Model =
    { transactions : List Transaction, month : Month, activeTransaction : Transaction }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { transactions = [], month = Jan, activeTransaction =  initTransaction}, getCurrentMonth )


initTransaction =
    { id = Nothing, description = "", executedOn = Nothing, recurring = False, value = 0.0, categoryId = Nothing }



-- UPDATE


type Msg
    = CurrentMonth Month
    | SaveTransaction
    | Description String
    | Recurring Bool


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        CurrentMonth currentMonth ->
            ( { model | month = currentMonth }, Cmd.none )

        SaveTransaction ->
            ( model, Cmd.none )

        Description description ->
            ( { model | activeTransaction = updateDescription model.activeTransaction description}, Cmd.none )

        Recurring recurring ->
            ( { model | activeTransaction = updateRecurring model.activeTransaction recurring}, Cmd.none)


updateDescription : Transaction -> String -> Transaction
updateDescription transaction description = 
    { transaction | description = description}


updateRecurring : Transaction -> Bool -> Transaction
updateRecurring transaction recurring = 
    { transaction | recurring = recurring}



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


view : Model -> Html Msg
view model =
    BsGrid.container []
        [ BsCDN.stylesheet -- creates an inline style node with the Bootstrap CSS
        , Icon.css -- inline style node for FontAwesome
        , BsGrid.row []
            [ BsGrid.col []
                [ Html.form
                    [ style "background-color" "#ff9900"
                    , style "border-radius" "10px"
                    , class "py-2"
                    , onSubmit SaveTransaction
                    ]
                    [ h2 [ class "py-2", class "px-4" ] [ text "Transaction" ]
                    , div [ class "form-group", class "row", class "py-2", class "px-4" ]
                        [ label [ for "descriptioninput", class "col-sm-3", class "col-form-label" ] [ text "Description" ]
                        , div [ class "col-sm-9" ] [ input [ id "descriptioninput"
                                                           , placeholder "Description"
                                                           , class "form-control"
                                                           , type_ "text"
                                                           , required True
                                                           , onInput Description ] [] ]
                        ]
                    , div [ class "form-group", class "row", class "py-2", class "px-4" ]
                        [ label [ for "recurringinput", class "col-sm-3", class "col-form-label" ] [ text "Recurring" ]
                        , div [ class "col-sm-9" ] [ input [ id "recurringinput"
                                                           , placeholder "Recurring"
                                                           , class "form-control"
                                                           , type_ "checkbox"
                                                           , required True
                                                           , onCheck Recurring ] [] ]
                        ]
                    ]
                ]
            ]
        ]



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
