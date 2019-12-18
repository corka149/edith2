export class Translations {
    private static DOMAN_TRANSLATIONS = {
        main: {
            'How can I help you?': {
                de: 'Wie kann ich helfen?',
                en: 'How can I help you?'
            },
            'Welcome to jARVIS!': {
                de: 'Willkommen bei jARVIS!',
                en: 'Welcome to jARVIS!'
            },
            'Welcome': {
                de: 'Willkommen',
                en: 'Welcome'
            }
        },
        account: {
            'E-Mail': {
                de: 'E-Mail',
                en: 'E-Mail'
            },
            'Password': {
                de: 'Passwort',
                en: 'Password'
            },
            'Submit': {
                de: 'Absenden',
                en: 'Submit'
            },
            'Invalid E-Mail': {
                de: 'Ungültige E-Mail',
                en: 'Invalid E-Mail'
            },
            'E-Mail is required': {
                de: 'E-Mail ist erforderlich',
                en: 'E-Mail is required'
            },
            'Password is required': {
                de: 'Passwort ist erforderlich',
                en: 'Password is required'
            },
            'Or sign in by': {
                de: 'Oder melde dich an bei',
                en: 'Or sign in by'
            },
            'Sign in to your account': {
                de: 'Meld dich in deinem Account an',
                en: 'Sign in to your account'
            }
        },
        shopping: {
            'All': {
                de: 'Alle',
                en: 'All'
            }, 'Current': {
                de: 'Aktuelle',
                en: 'Current'
            }, 'Shopping lists': {
                de: 'Einkaufslisten',
                en: 'Shopping lists'
            }, 'new shopping list': {
                de: 'Neue Einkaufsliste',
                en: 'new shopping list'
            }, 'Done': {
                de: 'Erledigt',
                en: 'Done'
            }, 'Planned for': {
                de: 'Geplant für',
                en: 'Planned for'
            }, 'Belongs to': {
                de: 'Gehört zu',
                en: 'Belongs to'
            }, 'Cancel': {
                de: 'Abbruch',
                en: 'Cancel'
            }, 'Save': {
                de: 'Speichern',
                en: 'Save'
            }, 'done': {
                de: 'erledigt',
                en: 'done'
            }, 'Choose a date': {
                de: 'Wähl ein Datum',
                en: 'Choose a date'
            }, 'Shopping list': {
                de: 'Einkaufsliste',
                en: 'Shopping list'
            }, 'Amount': {
                de: 'Menge',
                en: 'Amount'
            }, 'Items of shopping list planned for': {
                de: 'Gegenstände der Einkaufsliste für den',
                en: 'Items of shopping list planned for'
            }, 'Item': {
                de: 'Gegenstand',
                en: 'Item'
            }, 'Item name': {
                de: 'Gegenstandsname',
                en: 'Item name'
            }, 'Item name is required': {
                de: 'Gegenstandsname ist erforderlich',
                en: 'Item name is required'
            }, 'Amound is required': {
                de: 'Menge ist erforderlich',
                en: 'Amound is required'
            },
        }
    };

    private static TRANSLATIONS = {
        'Sign in': {
            de: 'Anmelden',
            en: 'Sign in'
        },
        'Please sign in': {
            de: 'Anmeldung notwendig',
            en: 'Please sign in'
        },
        'Sign out': {
            de: 'Abmelden',
            en: 'Sign out'
        },
        'Shopping lists': {
            de: 'Einkaufslisten',
            en: 'Shopping lists'
        },
        'Current': {
            de: 'Aktuelle',
            en: 'Current'
        },
        'All lists': {
            de: 'Alle Listen',
            en: 'All lists'
        },
        'User groups': {
            de: 'Benutzergruppen',
            en: 'User groups'
        },
        'Management': {
            de: 'Verwaltung',
            en: 'Management'
        },
        'Membership': {
            de: 'Mitgliedschaft',
            en: 'Membership'
        }
    };

    /**
     * Find translation by language and key.
     * @param language target language
     * @param key to be look up
     */
    public static find(language: string, key: string): string {
        const translatedText = Translations.TRANSLATIONS[key]
            && Translations.TRANSLATIONS[key][language]
            ? Translations.TRANSLATIONS[key][language] : key;

        if (translatedText === key && translatedText !== 'E-Mail') {
            console.log(`NOT FOUND: language="${language}", key="${key}"`);
        }

        return translatedText;
    }

    /**
     * Find translation by domain, language and key.
     * @param domain target domain
     * @param language target language
     * @param key to be look up
     */
    public static findByDomain(domain: string, language: string, key: string): string {
        const translatedText = Translations.DOMAN_TRANSLATIONS[domain]
            && Translations.DOMAN_TRANSLATIONS[domain][key]
            && Translations.DOMAN_TRANSLATIONS[domain][key][language]
            ? Translations.DOMAN_TRANSLATIONS[domain][key][language] : key;

        if (translatedText === key && translatedText !== 'E-Mail') {
            console.log(`NOT FOUND: domain="${domain}", key="${key}", language="${language}"`);
        }

        return translatedText;
    }

}