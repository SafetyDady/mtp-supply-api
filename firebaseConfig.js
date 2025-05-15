const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "mtp-store-supply",
    clientEmail: "firebase-adminsdk-fbsvc@mtp-store-supply.iam.gserviceaccount.com",
    privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC9Bz8kniZQiSxi
bGnSqJH3Wy3ezYSqarVuYQKmwrTmuDJBWxYkbsLBttnjVJjv45Fk0S1epWJiW739
f9FDYuR7qTrcskruZTU6UfI+wkpbjvLGTQfzD7ZiIMtimF18iPvZenDXVEY08mEQ
alAU7oJ5hoHXoyjo5wKHBZjAPEn3p6I5MNVN/uUKLjZRMf9HoKXsR7PImV64Ildx
MWP1bGz7c/nyjUjM8bWVKIkAMSWXHjgFH5tTSs9vBa8FAvyRrD890k3sWIXBwl3P
DHthg0ss52b23aTYZfdVXzBw4jcHnCzvFaOFrgTA4ONkYHRW+UOKZ7c7g+6n84cI
yPoFlkujAgMBAAECggEAL+4J9zV4npwhmnVF4ennVRKUD3YKKRH0nh/QBcvCBex3
pbW8aBGDpY3BMtDNFKqdv7QAboq95xW/F2uU+qK1L5vp9nLo6AjWlcqYg4xNQWj+
KwT2Oo3l33zURVRABCdRwMO4oAjY4m0A6qIiWyRdBgZynuRap6+Hpwfmwvumf7pc
pGcpAeP2TeyrEYAA0A1Nx76lQ8Wa4boj79RmiMibuev6ociWASDrrJ8MGhuBGNDp
AC5HnuX4JAEkmh8+ydTxXv+yhSnxn+iu4gfvfF7zSZ1pbmNMgBFu7E4wU3ctJboD
O1T4rw72mB6rpqOaYr1k8Mmv+GqovKhK88gCatynGQKBgQDg/nxHFgKdjyvuC9jM
tr0rDR6dgjEr3vBEPaEvmxnc5g1OuM0r23TtqG1rjCWjS3wrDfPszLnHwJIyrhbi
Ve8qe6IOc1q83OHnLxH3Th8ZGjLyC3qBmJjuMwMOKd1f6uyzMonA+JqOX43YCXM2
KShal7vfFQEvcseElHClnzkTKwKBgQDXE+7ODt5pqrxDwSc3qhEm6Upsm8FVCSMT
RW2s397Akl/jvn7tnU42nLoeMrV1bU0vU3HnH10yodpQvulQwn6CPP3u90U1KHie
VEN7ymTHT/QyL6kgWOundcNlAu1CsJU9noCvWcIamdfH/Xc2s7k8mMFihztZFnva
tRBcLnzNaQKBgAg7h5SaS5I0UOku6cnjzdwraLlesCnoyGXW03UIedPJXydIP8mh
CBBCH27V+/KTqoFwy0IY45tZgn/0OsYhWtT1HSLmOaW7d1CcOk4QP7cNbFvK67qe
OMpOd4gnJACEehC8gqna7tzSxj/naJ3Mt7tI3gj1nct8qaxCOjT1NINtAoGATzgF
TpqFa3A6tc4QLt2SQb3N7uETvcmGxNNeyT0QI+gGL7F7uPOm2lCx8OuGkMD4nATl
QFb6EesxqWoYL+njhP8IHRuwvxqwCslIrfDnW85kSJPrfIGkEuM6XBtO3rCB19do
2K175CZkJ0KBxYE/KkWtfSgIQREZ/32PkBSDXXkCgYBq7V29iZR9tWQS19bj2UP1
7tT9/N+2SGWDfUEbUxphtS28jMJRNlH+J+FWI1VFe7XqJcpqm/8PXAsF0Izwiq30
BLaWGgGIggGNQkxrCSmc4Q1OZ9Qau1ZfTSMzRRrpak1ELqhqrN+guTbsShiTyhTZ
HmdyAmmGVyVQ7gAcVsG7MQ==
-----END PRIVATE KEY-----
`,
  }),
  storageBucket: "mtp-store-supply.appspot.com",
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };
