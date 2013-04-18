var Faker = require( "Faker" ),
    IMG_CATEGORIES = [
        "abstract",
        "animals",
        "business",
        "cats",
        "city",
        "foodnight",
        "life",
        "fashion",
        "people",
        "nature",
        "sports",
        "technics",
        "transport"
    ],
    FAKE_POPCORN = [
        "http://popcorn.webmadecontent.org/tj5",
        "http://popcorn.webmadecontent.org/w0b",
        "http://popcorn.webmadecontent.org/y3h",
        "http://popcorn.webmadecontent.org/y3i"
    ],
    FAKE_THIMBLE = [
        "https://thimble.webmaker.org/p/lz5u/",
        "https://thimble.webmaker.org/p/lz55/",
        "https://thimble.webmaker.org/p/lz5h/",
        "https://thimble.webmaker.org/p/flij/",
        "https://thimble.webmaker.org/p/fd3h/"
    ];

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function maybe( chance, fn ) {
    var n = ( Faker.random.number( chance ) );
    if ( n === 0 ) { fn(); } else {
        return false;
    }
}


function makeFake() {
    var fakeData = {};

    var makeType = Faker.Helpers.randomize( [ "thimble", "popcorn", "challenge", "event", "kit", "demo" ] );

    fakeData.title = Faker.random.catch_phrase_adjective() + " " + Faker.random.bs_adjective() + " " + Faker.random.bs_noun();
    fakeData.email = Faker.Internet.email();
    fakeData.contentType = Faker.Helpers.randomize( [ "application/x-butter", "application/x-thimble", "text/html" ] );
    fakeData.description = Faker.Lorem.paragraph();
    fakeData.body = Faker.Lorem.paragraph();
    fakeData.thumbnail = "http://www.lorempixel.com/640/350/" + Faker.Helpers.randomize( IMG_CATEGORIES ) + "/" + Faker.random.number( 10 );
    fakeData.difficulty = Faker.Helpers.randomize(["Beginner","Intermediate","Advanced"]);
    fakeData.locale = Faker.Helpers.randomize(["en_us","en_ca","en_gb"]);
    fakeData.updatedAt = randomDate(new Date(2011,1,1), new Date ).toString();
    if ( makeType === "popcorn" ) {
        fakeData.url = Faker.Helpers.randomize( FAKE_POPCORN );
    } else if ( makeType === "thimble" ) {
        fakeData.url = Faker.Helpers.randomize( FAKE_THIMBLE );
    } else {
        fakeData.url = "http://www.webmaker.org/" + Faker.random.number( 99999999999 );
    }
    fakeData.remixedFrom = null;
    fakeData.tags = [];
    fakeData.author = Faker.Helpers.randomize([
        "matts@mozillafoundation.org", "kate@mozillafoundation.org", "jbuck@mozillafoundation.org",
        "scott@mozillafoundation.org", "surman@mozillafoundation.org", "pomax@mozillafoundation.org",
        Faker.Internet.email()
    ]);

    // Type
    fakeData.tags.push( "makeType:" + makeType );
    // Featured?
    maybe( 5, function() {
        fakeData.tags.push( "featured" );
    });
    // Has tutorial?
    maybe( 10, function() {
        fakeData.tags.push( "tutorial" );
    });
    // Generate a URL

    return fakeData;
}

module.exports = makeFake;

