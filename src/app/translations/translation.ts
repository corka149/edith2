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
            }
        },
        account: {
            'E-Mail': {
                de: 'E-Mail',
                en: 'E-Mail'
            },
            'Password': {
                de: 'Password',
                en: 'Passwort'
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

        if (translatedText === key) {
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

        if (translatedText === key) {
            console.log(`NOT FOUND: domain="${domain}", language="${language}", key="${key}"`);
        }

        return translatedText;
    }

}