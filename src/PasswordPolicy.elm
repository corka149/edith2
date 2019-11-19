module PasswordPolicy exposing (checkPassword)


validLowerCharacter = 
    "abcdefghijklmnopqrstuvwxyz"
isLowerCharacter passwordChar =
    String.contains passwordChar validLowerCharacter
hasLowerCharacter password =
    List.any isLowerCharacter <| String.split "" password


validUpperCharacter =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
isUpperCharacter passwordChar =
    String.contains passwordChar validUpperCharacter
hasUpperCharacter password = 
    List.any isUpperCharacter <| String.split "" password


validDigits = 
    "0123456789"
isDigit passwordChar = 
    String.contains passwordChar validDigits
hasDigit password =
    List.any isDigit <| String.split "" password


validSpecialCharacters = 
    "!@#$%&*-_"
isSpecialCharacter passwordChar =
    String.contains passwordChar validSpecialCharacters
hasSpecialCharater password =
    List.any isSpecialCharacter <| String.split "" password


checkPassword : String -> Bool
checkPassword password =
    hasLowerCharacter password
    && hasUpperCharacter password
    && hasDigit password
    && hasSpecialCharater password
