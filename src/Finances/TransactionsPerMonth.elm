module Finances.TransactionsPerMonth exposing (Category, Msg(..), init, main, subscriptions, update, view)

import Bootstrap.Button as BsButton
import Bootstrap.CDN as BsCDN
import Bootstrap.Grid as BsGrid
import Browser
import Date
import FontAwesome.Icon as Icon
import FontAwesome.Solid as Icon
import FontAwesome.Styles as Icon
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http
import Iso8601
import Json.Decode as DE
import Json.Encode as JE
import Shared.JarvisDatePicker as DatePicker
import Task
import Time



-- MAIN


main =
    Browser.element { init = init, update = update, subscriptions = subscriptions, view = view }



-- MODEL


type alias Category =
    { id : Int, name : String }


type alias Transaction =
    { id : Maybe Int, description : String, executedOn : Maybe Date.Date, recurring : Bool, value : Float, categoryId : Maybe Int }


type alias Model =
    { transactions : List Transaction, month : Time.Month, activeTransaction : Transaction, datePicker : DatePicker.Model }


init : () -> ( Model, Cmd Msg )
init _ =
    let
        ( datePicker, datePickerCmd ) =
            DatePicker.init
    in
    ( { transactions = [], month = Time.Jan, activeTransaction = initTransaction, datePicker = datePicker }, Cmd.map ExecutedOn datePickerCmd )


initTransaction =
    { id = Nothing, description = "", executedOn = Nothing, recurring = False, value = 0.0, categoryId = Nothing }



-- UPDATE


type Msg
    = CurrentMonth Time.Month
    | SaveTransaction
    | Description String
    | Recurring Bool
    | Value String
    | ExecutedOn DatePicker.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        CurrentMonth currentMonth ->
            ( { model | month = currentMonth }, Cmd.none )

        SaveTransaction ->
            ( model, Cmd.none )

        Description description ->
            ( { model | activeTransaction = updateDescription model.activeTransaction description }, Cmd.none )

        Recurring recurring ->
            ( { model | activeTransaction = updateRecurring model.activeTransaction recurring }, Cmd.none )

        Value transactionValue ->
            ( { model | activeTransaction = updateValue model.activeTransaction transactionValue }, Cmd.none )

        ExecutedOn subMsg ->
            let
                ( datePicker, datePickerCmd ) =
                    DatePicker.update subMsg model.datePicker
            in
            ( { model | datePicker = datePicker, activeTransaction = updateExecutedOn model.activeTransaction datePicker }
            , Cmd.map ExecutedOn datePickerCmd
            )


updateDescription : Transaction -> String -> Transaction
updateDescription transaction description =
    { transaction | description = description }


updateRecurring : Transaction -> Bool -> Transaction
updateRecurring transaction recurring =
    { transaction | recurring = recurring }


updateValue : Transaction -> String -> Transaction
updateValue transaction transactionValue =
    case String.toFloat transactionValue of
        Just val ->
            { transaction | value = val }

        Nothing ->
            transaction


updateExecutedOn : Transaction -> DatePicker.Model -> Transaction
updateExecutedOn transaction datePicker =
    { transaction | executedOn = datePicker.date }



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
                        , div [ class "col-sm-9" ]
                            [ input
                                [ id "descriptioninput"
                                , placeholder "Description"
                                , class "form-control"
                                , type_ "text"
                                , required True
                                , onInput Description
                                ]
                                []
                            ]
                        ]
                    , div [ class "form-group", class "row", class "py-2", class "px-4" ]
                        [ div [ class "col-sm-3" ] []
                        , div [ class "col-sm-9" ]
                            [ div [ class "custom-control", class "custom-checkbox" ]
                                [ input
                                    [ id "recurringinput"
                                    , class "custom-control-input"
                                    , type_ "checkbox"
                                    , onCheck Recurring
                                    ]
                                    []
                                , label [ for "recurringinput", class "custom-control-label" ] [ text "Recurring" ]
                                ]
                            ]
                        ]
                    , div [ class "form-group", class "row", class "py-2", class "px-4" ]
                        [ label [ for "valueinput", class "col-sm-3", class "col-form-label" ] [ text "Value in €" ]
                        , div [ class "col-sm-9" ]
                            [ input
                                [ id "valueinput"
                                , placeholder "Value in €"
                                , class "form-control"
                                , type_ "number"
                                , step "0.001"
                                , required True
                                , onInput Value
                                ]
                                []
                            ]
                        ]
                    , div [ class "form-group", class "row", class "py-2", class "px-4" ]
                        [ label [ class "col-sm-3", class "col-form-label" ] [ text "Recurring on" ]
                        , div [ class "col-sm-9" ] [ DatePicker.view model.datePicker |> Html.map ExecutedOn ]
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
        Time.Jan ->
            1

        Time.Feb ->
            2

        Time.Mar ->
            3

        Time.Apr ->
            4

        Time.May ->
            5

        Time.Jun ->
            6

        Time.Jul ->
            7

        Time.Aug ->
            8

        Time.Sep ->
            9

        Time.Oct ->
            10

        Time.Nov ->
            11

        Time.Dec ->
            12
