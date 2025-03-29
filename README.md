Robot Framework -testaustehtävät

Tehtävä 2: Kirjautumistesti ja tietojen piilottaminen

Tämän tehtävän tavoitteena oli luoda kirjautumistesti käyttäen Robot Frameworkin Browser Library -kirjastoa, joka simuloi käyttäjän kirjautumista web-lomakkeella. Erityishuomiota kiinnitettiin arkaluontoisten tietojen, kuten salasanojen, turvalliseen käsittelyyn.
Toteutus
Toteutin tehtävän kahdella tiedostolla:

Keywords.robot - Tiedosto, johon erotin arkaluontoiset tiedot:
robotframeworkCopy*** Variables ***
${Username}     somebody@example.com
${Password}     SuperSecret!
${Message}      Hello, Robot Framework!\nHow are you today?

browser_demo.robot - Varsinainen testitiedosto:
robotframeworkCopy*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    Keywords.robot  



*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       https://www.selenium.dev/selenium/web/web-form.html 
    Get Title      ==    Web form  
    Type Text      [name="my-text"]        ${Username}    delay=0.1 s 
    Type Secret    [name="my-password"]    $Password      delay=0.1 s
    Type Text      [name="my-textarea"]    ${Message}     delay=0.1 s
    Click With Options    button    delay=2 s
    Get Text       id=message    ==    Received!


Huomioitavat tietoturva-aspektit
Toteutuksessani huomioin seuraavat tietoturvaan liittyvät näkökohdat:

Tietojen erottaminen: Käyttäjätunnus ja salasana on erotettu varsinaisesta testikoodista erilliseen resurssitiedostoon
Salasanan piilottaminen lokitiedostoissa: Käytin Type Secret -avainsanaa, joka varmistaa että salasana ei näy selväkielisenä lokitiedostoissa
Modulaarisuus: Muuttujien erottaminen tekee koodista helpommin ylläpidettävää ja turvallisempaa

Testaustulokset
Testi suoriutui onnistuneesti, avaten Chromium-selaimen, täyttäen lomakkeen kentät ja varmistamalla että vastaus on odotettu "Received!". Lokitiedostoissa salasana näkyi asianmukaisesti piilotettuna, mikä vahvisti tietoturvakäytäntöjen toimivuuden.
Tehtävä 3: Web Form -lomake-elementtien testaus
Tehtävä 3 keskittyi laajentamaan web-lomakkeiden testausta monipuolisempiin lomake-elementteihin. Tavoitteena oli testata Selenium-projektin esimerkkisivun erityyppisiä lomakekenttiä ja niiden toiminnallisuutta.
Prosessi ja haasteet
Testin kehittämisessä kohtasin useita haasteita:

Browser Library -syntaksin hallinta: Browser Libraryn syntaksi vaatii tarkkuutta ja ymmärrystä selektoreiden käytöstä ja komentojen oikeasta muotoilusta
Erikoislomake-elementtien käsittely: Tietyt lomake-elementit kuten värivalitsimet ja liukusäätimet vaativat erityistä lähestymistapaa
Virheiden tunnistaminen ja korjaaminen: Virhetilanteiden analysointi ja korjaaminen vaati useita iteraatioita
Selektoreiden oikea käyttö: Web-elementtien löytäminen oikeilla selektoreilla vaati tarkkuutta

Testin kehittäminen eteni iteratiivisesti, alkaen yksinkertaisemmista elementeistä (tekstikentät) monimutkaisempiin (dropdown-valikot, valintaruudut). Jokaisen elementin lisäämisen jälkeen testasin toimivuuden ja korjasin mahdolliset ongelmat.
Lopullinen testikoodi
robotframeworkCopy*** Settings ***
Library     Browser    auto_closing_level=SUITE
Resource    Keywords.robot  

*** Test Cases ***
Test Web Form Elements
    [Documentation]    Testaa Web form-esimerkkisivun eri elementtien toimintaa
    # Avaa selain ja sivu
    New Browser    chromium    headless=No  
    New Page       https://www.selenium.dev/selenium/web/web-form.html 
    Get Title      ==    Web form
    
    # Testaa tekstikentät
    Type Text      [name="my-text"]        ${Username}    delay=0.1 s 
    Type Secret    [name="my-password"]    $Password      delay=0.1 s
    Type Text      [name="my-textarea"]    ${Message}     delay=0.1 s
    
    # Testaa dropdown-valikko (select)
    Select Options By    [name="my-select"]    text    Two
    
    # Testaa datalist
    Fill Text      [name="my-datalist"]    San Francisco
    
    # Testaa liukusäädin (range)
    Fill Text      [name="my-range"]    7
    
    # Testaa valintaruudut (checkboxit)
    Check Checkbox    [id="my-check-1"]
    Check Checkbox    [id="my-check-2"]
    
    # Lähetä lomake
    Click With Options    button    delay=2 s
    Get Text       id=message    ==    Received!
    
    # Testi on valmis
    Sleep          1s
Testien tulokset ja analyysi
Testin suoritus eteni seuraavasti:

Selaimen avaaminen ja sivulle navigointi: Testi avasi Chromium-selaimen ja navigoi onnistuneesti testisivulle
Tekstikenttien täyttö: Tekstikentät, salasanakentät ja tekstialueet täytettiin onnistuneesti käyttäen erotettuja muuttujia
Dropdown- ja datalist-testaus: Testi valitsi oikean vaihtoehdon pudotusvalikosta ja syötti arvon datalist-kenttään
Liukusäätimen asettaminen: Liukusäätimen arvo asetettiin onnistuneesti käyttäen tekstisyöttöä
Valintaruutujen valinta: Testi valitsi molemmat valintaruudut onnistuneesti
Lomakkeen lähetys: Testi lähetti lomakkeen ja varmisti että vastausviesti oli oikea

Lopulliset testitulokset olivat:
CopyWeb Form Test
==============================================================================
Test Web Form Elements :: Testaa Web form-esimerkkisivun eri eleme... | PASS |
------------------------------------------------------------------------------
Web Form Test                                                       | PASS |
1 test, 1 passed, 0 failed
==============================================================================

Tehtävän suorittaminen kehitti Robot Framework -taitojani merkittävästi:

Browser Libraryn tehokas käyttö: Opin hallitsemaan erilaisia selaintoimintoja ja komentoja sujuvasti
Web-elementtien käsittely: Kehitin ymmärrystäni erityyppisten web-elementtien testaamisesta ja niiden erityispiirteistä
Selkeä testien jäsentely: Paransin kykyäni kirjoittaa selkeitä, hyvin jäsenneltyjä ja dokumentoituja testejä
Virheiden käsittelytaidot: Virheilmoitusten analysointi ja ongelmien ratkaisu kehittyi merkittävästi

Jatkokehitysmahdollisuudet
Tehtävän pohjalta tunnistin useita jatkokehitysmahdollisuuksia:

Laajempi elementtien testaus: Testiä voisi laajentaa kattamaan enemmän elementtityyppejä ja niiden ominaisuuksia
Negatiiviset testitapaukset: Virhetilanteiden testaaminen (esim. liian pitkien merkkijonojen syöttäminen) lisäisi testin kattavuutta
Modulaarisempi lähestymistapa: Kehittyneiden avainsanojen luominen parantaisi koodin uudelleenkäytettävyyttä
Parametrisointi: Testidatan laajempi eriyttäminen ja parametrisointi tekisi testeistä joustavampia


![testi2 kaks_pass kolmas poistettu koska ei tarvitsee](https://github.com/user-attachments/assets/3e36a657-6753-4724-85ed-0e7664087dd2)


