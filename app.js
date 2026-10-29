// --- NAVEGACIÓN PRINCIPAL ---
function mostrarModulo(idModulo) {
    let modulos = document.querySelectorAll('.modulo');
    modulos.forEach(modulo => modulo.classList.remove('activo'));
    document.getElementById(idModulo).classList.add('activo');
}

// --- NAVEGACIÓN DESPLEGABLE (SUBMÓDULOS) ---
function cambiarSubModulo() {
    let seleccion = document.getElementById('selector_posteo').value;
    let submodulos = document.querySelectorAll('.submodulo');
    submodulos.forEach(sub => sub.classList.remove('activo'));
    document.getElementById('sub_' + seleccion).classList.add('activo');
}

function limpiarCajas(idSubmodulo) {
    let inputs = document.querySelectorAll(`#${idSubmodulo} input`);
    inputs.forEach(input => input.value = '');
}

// --- FUNCIONES MÓDULO 1: GENERAR POSTEO ---
function copiarFallaLineas() {
    let t = `*RNOC Irving Navarro - Ing. N2 de RNOC*
*SUCURSAL:* ${document.getElementById('fl_sucursal').value}
*TITULO FALLA:* ${document.getElementById('fl_titulo').value}
*TT:* ${document.getElementById('fl_tt').value}
*OT:* ${document.getElementById('fl_ot').value}
*#NODO/PUERTO:* ${document.getElementById('fl_nodo').value}
*CTC/HUB:* ${document.getElementById('fl_ctc').value}
*COORDENADAS:* ${document.getElementById('fl_coordenadas').value}
*CLIENTES AFECTADOS:* ${document.getElementById('fl_clientes').value}
*De su apoyo para la atención.*`;
    portapapeles(t);
}

function copiarMca() {
    let t = `*RNOC Irving Navarro - Ing. N2 de RNOC*
*SUCURSAL:* ${document.getElementById('mc_sucursal').value}
*AFECTACIÓN / SERVICIO:* ${document.getElementById('mc_afectacion').value}
*TT:* ${document.getElementById('mc_tt').value}
*OT:* ${document.getElementById('mc_ot').value}
*UBICACIÓN:* ${document.getElementById('mc_ubicacion').value}
*CONTACTO:* ${document.getElementById('mc_contacto').value}
*PARCHEO:* ${document.getElementById('mc_parcheo').value}
*ALARMA:* ${document.getElementById('mc_alarma').value}
*De su apoyo para la atención.*`;
    portapapeles(t);
}

function copiarEnlaces() {
    let t = `*RNOC Irving Navarro - Ing. N2 de RNOC*
*SUCURSAL:* ${document.getElementById('en_sucursal').value}
*AFECTACIÓN / SERVICIO:* ${document.getElementById('en_afectacion').value}
*TT:* ${document.getElementById('en_tt').value}
*OT:* ${document.getElementById('en_ot').value}
*De su apoyo para la atención.*`;
    portapapeles(t);
}

function portapapeles(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        alert("¡Copiado con éxito!");
    }).catch(err => alert("Error al copiar."));
}

// --- FUNCIONES UNIFICADAS: LIMPIADOR GPON UNIVERSAL ---
function formatearGponUniversal(idIn, idOut) {
   let entrada = document.getElementById(idIn).value;
   if (!entrada.trim()) { document.getElementById(idOut).value = ''; return; }
   let textoLimpio = entrada.replace(/Serie/gi, '').replace(/:/g, '').replace(/\|/g, '');
   let elementos = textoLimpio.split(/[\n\t ,]+/);
   let elementosValidos = elementos.filter(item => item !== '');
   let elementosUnicos = [...new Set(elementosValidos)];
   document.getElementById(idOut).value = elementosUnicos.join(',');
}

function limpiarGpon(idIn, idOut) {
    document.getElementById(idIn).value = '';
    document.getElementById(idOut).value = '';
}

function copiarGpon(idOut) {
    let resultado = document.getElementById(idOut).value;
    if (resultado === "") { alert("Primero debes formatear el texto."); return; }
    portapapeles(resultado);
}

// --- DICCIONARIO DE COLORES PARA BUFFER E HILO ---
const codigoColores = {
    1: "Azul", 2: "Anaranjado", 3: "Verde", 4: "Cafe", 5: "Plateado (Gris)", 6: "Blanco",
    7: "Rojo", 8: "Negro", 9: "Amarillo", 10: "Violeta", 11: "Rosa", 12: "Aqua (Celeste)"
};

// --- FUNCIÓN UNIFICADA: IDENTIFICADOR DE BUFFER E HILO UNIVERSAL ---
function identificarBufferHiloUniversal(idIn, idOut) {
   let texto = document.getElementById(idIn).value;
   if (!texto.trim()) { document.getElementById(idOut).value = ''; return; }
   let regexPuerto = /\b(?:\d+\/\d+\/\d+\/\d+|[01]\/\d+\/\d+)/g;
   let regexRT = /RT\d{2},(\d{2}),(\d{2})/g;
   let matchesPuerto = texto.match(regexPuerto) || [];
   let matchesRT = [...texto.matchAll(regexRT)];
   if (matchesPuerto.length === 0 && matchesRT.length === 0) {
       document.getElementById(idOut).value = "No se encontraron datos reconocibles.";
       return;
   }
   let resultados = [];
   for (let i = 0; i < matchesPuerto.length; i++) {
       let puerto = matchesPuerto[i];
       let colorBuffer = "Desconocido";
       let colorHilo = "Desconocido";
       if (i < matchesRT.length) {
           let numeroBuffer = parseInt(matchesRT[i][1], 10);
           let numeroHilo = parseInt(matchesRT[i][2], 10);
           colorBuffer = codigoColores[numeroBuffer] || "Color no registrado";
           colorHilo = codigoColores[numeroHilo] || "Color no registrado";
       }
       resultados.push(`Puerto (${puerto}) Buffer: (${colorBuffer}) - Hilo: (${colorHilo})`);
   }
   document.getElementById(idOut).value = resultados.join('\n\n');
}

function limpiarBuffer(idIn, idOut) {
    document.getElementById(idIn).value = '';
    document.getElementById(idOut).value = '';
}

function copiarBuffer(idOut) {
    let resultado = document.getElementById(idOut).value;
    if (resultado === "") { alert("Primero debes identificar los datos."); return; }
    portapapeles(resultado);
}

// --- DICCIONARIO DE SUCURSALES ---
const diccionarioSucursales = {
    "1": "Hermosillo", "2": "Guaymas", "3": "Cd. Obregon", "4": "Navojoa", "5": "Huatabampo",
    "6": "Los Mochis", "7": "Guasave", "8": "Guamúchil", "9": "Culiacan", "10": "Mazatlan",
    "11": "Escuinapa", "12": "Tepic", "13": "Zamora", "14": "Jacona", "15": "Xalisco",
    "16": "Xalapa", "17": "Coatepec", "18": "Veracruz", "19": "Tlacotalpan", "20": "Carlos A. Carrillo",
    "21": "Cosamaloapan", "22": "Empalme", "24": "El Rosario", "25": "El Fuerte", "26": "Navolato",
    "27": "Puebla", "28": "Cholula", "29": "Torreon", "30": "Gomez Palacio", "31": "Lerdo",
    "32": "Durango", "33": "Morelia", "35": "Tuxtla Gutierrez", "36": "San Cristobal", "37": "Comitan",
    "38": "Villa flores", "39": "Matamoros", "40": "San Pedro", "41": "Guadalajara", "42": "Tlaquepaque",
    "43": "Tonala", "44": "Tlajomulco", "45": "Fco I Madero", "46": "Zapotlanejo", "47": "Leon",
    "50": "Banderilla", "51": "Cuautlancingo", "52": "Chiapa De Corzo", "53": "Zacatecas", "54": "Queretaro",
    "56": "Cardel", "57": "Ursulo Galván", "58": "Zempoala", "59": "El Dorado", "60": "Costa Rica",
    "61": "Miguel Aleman", "62": "Villa Corregidora", "63": "Tlalnepantla", "64": "Tehuacan", "65": "Ixtlahuacan de los M",
    "66": "Tuxpan", "67": "Ixmiquilpan", "68": "HUIXTLA", "69": "Tonala", "70": "Perote",
    "71": "Misantla", "72": "Huajuapan de leon", "73": "Arriaga", "74": "Tepeaca", "75": "Acatzingo",
    "76": "Emiliano Zapata", "77": "Tecamachalco", "78": "Champoton", "79": "San Salvador Elseco", "80": "Juan Jose Rios",
    "81": "Gabriel Leyva Solano", "82": "Adolfo Ruiz Cortinez", "83": "Zihuatanejo", "84": "Petatlan", "85": "Benito Juarez",
    "86": "Matias Romero", "87": "Papantla", "88": "Gutierrez Zamora", "89": "Tlapacoyan", "90": "Jojutla",
    "91": "Salina Cruz", "92": "Zacatepec", "93": "Huatulco", "94": "Sta. Ma. Huatulco", "95": "San Pedro Pochutla",
    "96": "Tehuantepec", "97": "Villa Union", "98": "Juchitan", "99": "Tlaquiltenango", "100": "Tlaltizapan",
    "101": "Galeana", "102": "Xoxocotla", "103": "Tehuixtla", "104": "Ixtepec", "105": "Union Hidalgo",
    "106": "Toluca", "107": "Metepec", "108": "Lerma", "109": "San Mateo Atenco", "110": "Zinacantepec",
    "111": "Salamanca", "112": "Tenancingo", "113": "Valle de Bravo", "114": "San José del Cabo", "115": "Cabo San Lucas",
    "116": "Zitacuaro", "117": "Ciudad Hidalgo", "118": "Silao", "119": "La Piedad", "120": "Tenango Del Valle",
    "121": "Xalatlaco", "122": "Atlacomulco", "123": "Villa del Carbón", "124": "Almoloya De Juarez", "125": "Xonacatlan",
    "126": "Tepoztlán", "127": "Huixquilucan", "128": "Hueypoxtla", "129": "C.I. - Tepojaco", "130": "Huehuetoca",
    "131": "Temoaya", "132": "Numaran", "133": "Sta María del Río", "134": "Patzcuaro", "135": "Puruandiro",
    "136": "Cuitzeo", "137": "Huandacareo", "138": "Villa Cuauhtemoc", "139": "Indaparapeo", "140": "Charo",
    "141": "Angamacutiro", "142": "Zinapecuaro", "143": "Tanhuato", "144": "Vista Hermosa", "145": "Yurecuaro",
    "146": "Tangancicuaro", "147": "Chilchota", "148": "San Jose Iturbide", "149": "Maravatio", "150": "San Felipe",
    "151": "Jalpa", "152": "Ixtlahuaca", "153": "Jerez", "154": "Juventino", "155": "Zimapan",
    "156": "Cadereyta", "157": "Pastor", "158": "Angostura", "159": "Mocorito", "160": "Alhuey",
    "161": "Chachapa", "162": "Amozoc", "163": "Tepatlaxco", "164": "Tierra Blanca", "165": "Acuitzio",
    "166": "Tarimbaro", "167": "Uruetaro", "168": "Carapan", "169": "Alamos", "170": "Topolobampo",
    "171": "Ahome", "172": "Medellín De Bravo", "173": "Colima", "174": "Villa Nicolás Romero", "175": "Acambay",
    "176": "Temascalcingo", "177": "La Paz", "178": "Ciudad Constitucion", "179": "Loreto", "180": "Santa Rosalia",
    "181": "Guerrero Negro", "182": "Churintzio", "183": "Tlazazalca", "184": "Piedras Negras", "185": "San Miguel de Allende",
    "186": "Uruapan", "187": "San Luis De La Paz", "188": "Comonfort", "189": "Mineral Del Monte", "190": "Tecali",
    "191": "Villa de Colorines", "192": "Santo Tomas", "193": "Sahuayo", "194": "Mazamitla", "195": "San Jose De Gracia",
    "196": "Omitlan De Juarez", "197": "Todos Santos", "198": "Jiquilpan", "199": "Tres Valles", "200": "Chavinda",
    "201": "Concordia", "202": "Barriles", "203": "Ixtlahuacan", "204": "Manlio Fabio", "205": "Reconstructora",
    "206": "Nogales", "208": "San Luis Rio Col", "209": "Agua Prieta", "210": "Naco", "211": "Esqueda",
    "212": "Nacozari", "213": "Moctezuma", "214": "Tultepec", "215": "Magdalena", "216": "Bahía de Kino",
    "217": "Cananea", "218": "Nuevo Casas Grandes", "219": "Santa Ana", "220": "Caborca", "221": "Altar",
    "223": "Puerto Peñasco", "224": "Sonoyta", "225": "San Felipe", "226": "Zumpango", "227": "San Blas",
    "228": "Villa Juarez", "229": "San Antonio La Isla", "230": "Benito Juarez SLRC", "231": "Puente Grande", "232": "Santa Maria Rayon",
    "233": "Calimaya", "234": "Joquicingo", "235": "Santa Maria Jajalpa", "236": "Ures", "237": "Carbo",
    "238": "Rinconada", "239": "Berriozabal", "240": "Dolores", "241": "Jocotitlan", "242": "Pericos",
    "243": "Paso De Ovejas", "244": "Sayula", "245": "TUXPAN", "246": "Angangueo", "247": "Usmajac",
    "248": "Atoyac", "249": "Teocuitatlan", "250": "El Grullo", "251": "Benjamin Hill", "252": "Quiroga",
    "253": "Tzintzuntzan", "254": "Tizapan El Alto", "255": "Tonaya", "256": "Banamichi", "257": "Rayon",
    "258": "Amacueca", "259": "Tapalpa", "260": "Tlacotepec", "261": "Choix", "262": "Coyotepec",
    "263": "Altotonga", "264": "Tianguistenco", "265": "Mexicaltzingo", "266": "Malpaso", "267": "Jalacingo",
    "268": "Ocoyoacac", "269": "Atemajac", "270": "Acatlan", "271": "Zacoalco De Torres", "272": "Tala",
    "273": "Venustiano Carranza", "274": "Villamar", "275": "Pajacuaran", "276": "Emiliano Zapata", "277": "Cojumatlan",
    "278": "Talpa", "279": "Mascota", "280": "Cocula", "281": "Sauceda", "282": "La Peñita",
    "283": "Apaseo El Grande", "284": "Apaseo El Alto", "285": "Hermosillo 2", "286": "Autlan De Navarro", "287": "San Juan De La Vega",
    "288": "Tuxtepec", "289": "Guanajuato", "290": "Tequisquiapan", "291": "Peña De Bernal", "292": "Ezequiel Montes",
    "293": "Colon", "294": "Union De Tula", "295": "Conc de Buenos Aires", "296": "Manzanilla De La Paz", "297": "Valle De Juarez",
    "298": "Ascención", "299": "Jalcomulco", "300": "Chalco", "301": "Villa Guerrero", "302": "Ixtapan De La Sal",
    "303": "Tuxcueca", "304": "Soyatlan", "305": "Huejotzingo", "306": "Epazoyucan", "307": "Pueblo Yaqui",
    "308": "Loma Bonita", "309": "Ajalpan", "310": "Hueyotlipan", "311": "Ejido Hermosillo BC", "312": "Ecuandureo",
    "313": "San José Chiapa", "314": "Rancho Los Lobos", "315": "Romita", "316": "Villa Corona", "317": "Taretan",
    "318": "Sn Angel Zurumucapio", "319": "Ziracuaretiro", "320": "Zirimicuaro", "321": "Caracha", "322": "Alvarado",
    "323": "Ciudad de México", "324": "Monterrey", "325": "Cancún", "326": "Queseria", "327": "Ocozocoautla",
    "328": "Tarandacuao", "329": "Estipac", "330": "Celaya", "331": "Puente de Ixtla", "332": "Nextlalpan",
    "333": "Zapopan", "334": "Merida", "335": "Santa Ana Pacueco", "336": "Villanueva", "337": "Ciudad Juarez",
    "338": "Zirahuen", "339": "Martinez de la Torre", "340": "Zacatelco", "341": "Cd. Isla", "342": "Sta. Ma. Moyotzingo",
    "343": "San Rafael", "344": "Sn Isidro Mazatepec", "345": "Cintalapa", "346": "La Labor", "347": "Cd. Serdán",
    "348": "Atotonilco de Tula", "349": "Cortazar", "350": "Villagran", "351": "Villa Comaltitlán", "352": "Naolinco",
    "353": "La Valla", "354": "Cerano", "355": "Miacatlán", "356": "El Oro", "357": "Penjamo",
    "358": "Abasolo", "359": "Villa Alta", "361": "Puebla 2", "362": "Cholula 2", "364": "Guadalajara 2",
    "365": "Tlaquepaque 2", "366": "Tonala 2", "367": "Tlajomulco 2", "368": "Leon 2", "369": "Cuautlancingo 2",
    "370": "Zacatecas 2", "371": "Queretaro 2", "372": "Villa Corregidora 2", "373": "Toluca 2", "374": "Metepec 2",
    "375": "San Mateo Atenco 2", "376": "Zinacantepec 2", "379": "Tizayuca", "380": "Calpulalpan", "381": "Laguna Larga",
    "382": "Pueblo Nuevo", "383": "Cueramaro", "384": "Juarez", "385": "Jilotepec", "386": "Huanimaro",
    "387": "Parras", "388": "Ojocaliente", "389": "Mapastepec", "390": "Galindo", "391": "Nautla",
    "392": "Temascaltepec", "393": "Nanacamilpa", "394": "Emiliano Z", "395": "Jiquipilco", "396": "Actopan",
    "397": "Sayulita", "398": "San Francisco", "399": "Gustavo A. Madero", "400": "Azcapotzalco", "401": "Miguel Hidalgo",
    "402": "Apodaca", "403": "San Nicolas de los G", "404": "Escobedo", "405": "Santa Catarina", "406": "San Pedro Garza",
    "407": "Guadalupe", "408": "Palenque", "409": "Balancan", "410": "Libertad", "411": "Mixquiahuala",
    "412": "Puerto Arista", "413": "Tlahuelilpan", "414": "Atenguillo", "415": "Tungareo", "416": "Atizapan de Zaragoza",
    "417": "Cuautitlán Izcalli", "418": "Catazajá", "419": "Huehuetan", "420": "Escuintla", "421": "Doctor Mora",
    "422": "Saltillo", "423": "Tapachula", "424": "Tonila", "425": "Chihuahua", "426": "San Luis Potosi",
    "427": "Aguascalientes", "428": "Ameca", "429": "Tequila", "430": "El Medineño", "431": "Santa Teresa",
    "432": "Magdalena", "433": "La Venta del Astille", "434": "El Arenal", "435": "Amatitan", "436": "Santa Clara del Cobre",
    "437": "Santiago Oxtotitlán", "438": "Pesqueira", "439": "Axochiapan", "440": "Tepalcingo", "441": "San Martin Texmelucan",
    "442": "Copandaro de Galeana", "443": "Tuxtilla", "444": "Tijuana", "445": "Mexicali", "446": "Alpuyeca",
    "447": "Cazones", "448": "TEJUPILCO", "449": "Apazapan", "450": "CD Guzman", "451": "Lagos de Moreno",
    "452": "Encarnacion de Diaz", "454": "Puerto Vallarta", "455": "Ocotlan", "456": "Tultitlan", "457": "Cuautitlan",
    "458": "Cosio", "459": "Playa del Carmen", "460": "Allende", "461": "Sultepec", "462": "Villa Luvianos",
    "463": "Zacapu", "464": "Villa Jimenez", "465": "Purepero", "466": "Moroleon", "467": "Uriangato",
    "468": "Yuriria", "469": "Jocotepec", "470": "Chapala", "472": "Iztacalco", "473": "Venustiano Carranza 2",
    "474": "Cuernavaca", "475": "Ayahualulco", "476": "Cosautlan", "478": "La Barca", "479": "Ahualulco",
    "480": "Amatlan de Cañas", "481": "Acapulco", "482": "Teziutlan", "483": "La Cruz", "484": "El Espinal",
    "485": "Las Flores", "486": "San Nicolas", "487": "Tlaxcala", "488": "Ciudad Sahagun", "489": "Fresnillo",
    "490": "Tenosique", "491": "Jonacatepec", "492": "Poza Rica", "493": "Villahermosa", "494": "Manzanillo",
    "495": "Pachuca", "496": "Apan", "497": "Naucalpan", "498": "Obispo", "499": "Ejido Querétaro",
    "500": "San Martin Hidalgo", "501": "Playas de Rosarito", "502": "Ejido Coahuila", "503": "Atlixco", "504": "Apizaco",
    "505": "Huamantla", "506": "Izucar de Matamoros", "507": "Zapotiltic", "508": "El Marques", "509": "Tequila 2",
    "510": "Magdalena 2", "511": "Amatitan 2", "512": "Campeche", "513": "San Juan del Rio", "514": "Tequixquiac",
    "515": "Acambaro", "516": "San Francisco Del Ri", "517": "Coacalco", "518": "Cordoba", "519": "Orizaba",
    "520": "Tampico", "521": "Ciudad Mendoza", "522": "Coatzacoalcos", "523": "Oaxaca", "524": "Ajijic",
    "526": "Ciudad Del Carmen", "527": "Coyoacan", "531": "Texcoco", "534": "Nezahualcoyotl", "537": "Valle de Chalco", "540": "Ecatepec",
    "546": "Ramos Arizpe", "547": "Arteaga"
};

function autocompletarSucursal(idInput) {
    let inputCaja = document.getElementById(idInput);
    let numeroEscrito = inputCaja.value.trim(); 
    if (diccionarioSucursales[numeroEscrito]) {
        inputCaja.value = numeroEscrito + " - " + diccionarioSucursales[numeroEscrito];
    }
}

// --- FUNCIONES MÓDULO 3: CONSULTA NODO'S ---

function procesarNodos(idIn, idOut) {
   let texto = document.getElementById(idIn).value;
   if (!texto.trim()) {
       document.getElementById(idOut).value = '';
       document.getElementById('contador_nodos').innerText = "";
       return;
   }
   let lineas = texto.split('\n');
   let registros = [];
   let regexHora = /\b(?:\d|[01]\d|2[0-3]):[0-5]\d:[0-5]\d\b/;
   let regexMac = /\b[0-9a-fA-F]{4}\.[0-9a-fA-F]{4}\.[0-9a-fA-F]{4}\b/;
   function timeToSeconds(hms) {
       let partes = hms.split(':');
       return parseInt(partes[0]) * 3600 + parseInt(partes[1]) * 60 + parseInt(partes[2]);
   }
   for (let linea of lineas) {
       let matchHora = linea.match(regexHora);
       let matchMac = linea.match(regexMac);
       if (matchHora && matchMac) {
           registros.push({
               horaOriginal: matchHora[0],
               segundos: timeToSeconds(matchHora[0]),
               mac: matchMac[0].toLowerCase()
           });
       }
   }
   if (registros.length === 0) {
       document.getElementById(idOut).value = "No se encontraron registros válidos.";
       document.getElementById('contador_nodos').innerText = "";
       return;
   }
   registros.sort((a, b) => a.segundos - b.segundos);
   let bloques = [];
   let bloqueActual = [registros[0]];
   for (let i = 1; i < registros.length; i++) {
       let diff = registros[i].segundos - registros[i-1].segundos;
       if (diff >= 0 && diff <= 8) {
           bloqueActual.push(registros[i]);
       } else {
           if (bloqueActual.length > 1) { bloques.push(bloqueActual); }
           bloqueActual = [registros[i]];
       }
   }
   if (bloqueActual.length > 1) { bloques.push(bloqueActual); }
   if (bloques.length === 0) {
       document.getElementById('contador_nodos').innerText = `(0 registros cumplen la regla)`;
       document.getElementById(idOut).value = "Ningún registro cumplió la regla de continuidad (0 a 8 segundos).";
       return;
   }
   let bloqueMayor = bloques[0];
   for (let i = 1; i < bloques.length; i++) {
       if (bloques[i].length > bloqueMayor.length) { bloqueMayor = bloques[i]; }
   }
   let macsUnicas = [...new Set(bloqueMayor.map(reg => reg.mac))];
   document.getElementById(idOut).value = macsUnicas.join(',');
   document.getElementById('contador_nodos').innerText = `(${bloqueMayor.length} registros en la ráfaga principal)`;
}

function limpiarCajasNodo(idIn, idOut) {
   document.getElementById(idIn).value = '';
   document.getElementById(idOut).value = '';
   document.getElementById('contador_nodos').innerText = ''; // Borra también el contador
}
function copiarTexto(idElemento) {
   let resultado = document.getElementById(idElemento).value;
   if (resultado === "" || resultado.includes("No se encontraron") || resultado.includes("Ningún registro")) {
       alert("No hay datos válidos para copiar.");
       return;
   }
   portapapeles(resultado);
}

// --- FUNCIONES MÓDULO 4: GPON MASIVA (UNIVERSAL MULTIMARCA) ---
function procesarGponMasiva() {
   let texto = document.getElementById('gm_entrada').value;
   let contenedorSalida = document.getElementById('gm_salida');
   window.puertosGponMasiva = []; // Reseteamos la lista global
   if (!texto.trim()) {
       contenedorSalida.innerHTML = '<span style="color: #aeb4c8;">La tabla aparecerá aquí automáticamente...</span>';
       return;
   }
   let lineas = texto.split('\n');
   let registros = [];
   const paletaColores = {
       1: {bg: "#0052cc", text: "#fff"}, 2: {bg: "#ff8c00", text: "#fff"},
       3: {bg: "#28a745", text: "#fff"}, 4: {bg: "#8b4513", text: "#fff"},
       5: {bg: "#6c757d", text: "#fff"}, 6: {bg: "#ffffff", text: "#000"},
       7: {bg: "#dc3545", text: "#fff"}, 8: {bg: "#343a40", text: "#fff"},
       9: {bg: "#ffc107", text: "#000"}, 10: {bg: "#6f42c1", text: "#fff"},
       11: {bg: "#e83e8c", text: "#fff"}, 12: {bg: "#17a2b8", text: "#fff"}
   };
   for (let linea of lineas) {
       if (!linea.trim() || linea.includes('Instance') || linea.includes('Index')) continue;
       let cols = linea.split(',').map(c => c.trim());
       if (cols.length < 10) continue;
       let gpon = "", hub = "", olt = "", rt = "", bfrStr = "", hiloStr = "", tcl = "", clte = "N/A";
       if (linea.includes('Huawei') || cols[1].includes('GPON')) {
           let gponMatch = cols[1].match(/GPON\s+(\d+\/\d+\/\d+)/);
           gpon = gponMatch ? gponMatch[1] : cols[1];
           hub = cols[3]; olt = cols[4]; rt = cols[5]; bfrStr = cols[6]; hiloStr = cols[7]; tcl = cols[8]; clte = cols[20] || "N/A";
       } else if (cols[1].includes('gpon_olt')) {
           let gponMatch = cols[1].match(/gpon_olt-(\d+\/\d+\/\d+)/);
           gpon = gponMatch ? gponMatch[1] : cols[1];
           hub = cols[2]; olt = cols[3]; rt = cols[4]; bfrStr = cols[5]; hiloStr = cols[6]; tcl = cols[7];
           let clteMatch = linea.match(/(\d+)\s*Units/); clte = clteMatch ? clteMatch[1] : "N/A";
       } else {
           let gponMatch = cols[1].match(/(\d+\/\d+\/\d+\/\d+)-\d+/);
           gpon = gponMatch ? gponMatch[1] : cols[1];
           hub = cols[2]; olt = cols[3]; rt = cols[4]; bfrStr = cols[5]; hiloStr = cols[6]; tcl = cols[7]; clte = cols[13] || "N/A";
       }
       registros.push({
           gpon: gpon, hub: hub, olt: olt, rt: rt,
           bfrStr: bfrStr, bfrNum: parseInt(bfrStr, 10),
           hiloStr: hiloStr, hiloNum: parseInt(hiloStr, 10),
           tcl: tcl, clte: clte
       });
       // Guardamos el puerto limpio en la variable global
       window.puertosGponMasiva.push(gpon);
   }
   if (registros.length === 0) {
       contenedorSalida.innerHTML = '<span style="color: #dc3545;">No se detectaron registros válidos.</span>';
       return;
   }
   // Dibujamos la tabla solo con la columna STATUS extra
   let html = `<table class="tabla-gpon" id="tabla_masiva_final">
<thead>
<tr>
<th>GPON</th><th>HUB</th><th>OLT</th><th>RT</th>
<th>BFR</th><th>HILO</th><th>TCL</th><th>CLTE</th>
<th>STATUS</th>
</tr>
</thead>
<tbody>`;
   for (let reg of registros) {
       let colBfr = paletaColores[reg.bfrNum] || {bg: "transparent", text: "#fff"};
       let colHilo = paletaColores[reg.hiloNum] || {bg: "transparent", text: "#fff"};
       // Añadimos un ID único a cada fila
       let idFila = 'fila-' + reg.gpon.replace(/\//g, '-');
       html += `<tr id="${idFila}">
<td>${reg.gpon}</td>
<td>${reg.hub}</td>
<td>${reg.olt}</td>
<td>${reg.rt}</td>
<td style="background-color: ${colBfr.bg}; color: ${colBfr.text}; font-weight: bold;">${reg.bfrStr}</td>
<td style="background-color: ${colHilo.bg}; color: ${colHilo.text}; font-weight: bold;">${reg.hiloStr}</td>
<td>${reg.tcl}</td>
<td>${reg.clte}</td>
<td class="status-espera status-cell">--</td>
</tr>`;
   }
   html += `</tbody></table>`;
   contenedorSalida.innerHTML = html;
}
function limpiarGponMasiva() {
   document.getElementById('gm_entrada').value = '';
   document.getElementById('gm_ip_olt').value = '';
   document.getElementById('gm_salida').innerHTML = '<span style="color: #aeb4c8;">La tabla aparecerá aquí automáticamente...</span>';
   document.getElementById('gm_status_txt').innerText = '';
   window.puertosGponMasiva = [];
}
function copiarTablaGponMasiva() {
   let tabla = document.getElementById('tabla_masiva_final');
   if (!tabla) { alert("No hay tabla para recortar."); return; }
   chrome.runtime.sendMessage({
       accion: "capturar_div_local",
       elementoId: "gm_salida"
   });
}
function iniciarValidacionFantasma() {
   let ip = document.getElementById('gm_ip_olt').value.trim();
   if (!ip) { alert("Debes ingresar la IP de la OLT para validar."); return; }
   if (window.puertosGponMasiva.length === 0) { alert("No hay puertos detectados en la tabla para validar."); return; }
   document.getElementById('gm_status_txt').innerText = "(Validando en SAPIENS... por favor espera)";
   chrome.runtime.sendMessage({
       accion: "validar_fantasma",
       ip: ip,
       puertos: window.puertosGponMasiva
   });
}

// ========================================================
// AUTOMATIZACIÓN ZERO-CLICK (EJECUCIÓN AL PEGAR TEXTO)
// ========================================================
document.addEventListener("DOMContentLoaded", function() {
   // 1. Reaccionar en Limpiador de Series GPON
   let gponEntrada = document.getElementById('gpon_entrada');
   if (gponEntrada) {
       gponEntrada.addEventListener('input', function() {
           formatearGponUniversal('gpon_entrada', 'gpon_salida');
       });
       
       // ========================================================
// ESCUCHADOR DE RESPUESTAS DEL ROBOT FANTASMA (SAPIENS)
// ========================================================
window.addEventListener("message", function(event) {
   // Verificamos que el mensaje venga de nuestra extensión
   if (event.data && event.data.accion === "resultado_sapiens") {
       let puerto = event.data.puerto; // Ej: "1/1/1/1"
       let losi = parseInt(event.data.losi, 10);
       // Reconstruimos el ID de la fila para encontrarla en la tabla
       let idFila = 'fila-' + puerto.replace(/\//g, '-');
       let fila = document.getElementById(idFila);
       if (fila) {
           // Buscamos la celda de STATUS en esa fila
           let celdaStatus = fila.querySelector('.status-cell');
           if (celdaStatus) {
               // APLICAMOS LA REGLA MATEMÁTICA: <=4 es UP, >=5 es DOWN
               if (losi <= 4) {
                   celdaStatus.innerHTML = "UP";
                   celdaStatus.className = "status-up status-cell";
               } else {
                   celdaStatus.innerHTML = "DOWN";
                   celdaStatus.className = "status-down status-cell";
               }
           }
       }
   }
});
   }
   // 2. Reaccionar en Identificador de Buffer e Hilo
   let bhEntrada = document.getElementById('bh_entrada');
   if (bhEntrada) {
       bhEntrada.addEventListener('input', function() {
           identificarBufferHiloUniversal('bh_entrada', 'bh_salida');
       });
   }
   // 3. Reaccionar en Consulta Nodo's (MACs)
   let nodoEntrada = document.getElementById('nodo_entrada');
   if (nodoEntrada) {
       nodoEntrada.addEventListener('input', function() {
           procesarNodos('nodo_entrada', 'nodo_salida');
       });
   }
    // 4. Reaccionar en GPON Masiva
   let gmEntrada = document.getElementById('gm_entrada');
   if (gmEntrada) {
       gmEntrada.addEventListener('input', procesarGponMasiva);
   }
});
