//PAPP
import "./App.css";
  import XMLEra from "./era.xml";
  import XMLMedia from "./mediaCina.xml";
import React from "react";
import { albi } from "./item.js";
// import XMLCircolari from "./newsMagniniVecchio.xml";


import axios from "axios";
import moment from "moment";
// import "moment/locale/it";

// import { lista, listaFile } from "./listaNotizie.js";

function App() {
  const [xmlEra, setXmlEra] = React.useState("");
  const [xmlCreator, setXmlCreator] = React.useState("");
  const [data, setData] = React.useState([]);
  const [xmlMediaVecchi, setXmlMediaVecchi] = React.useState("");
  const [xmlMedia, setXmlMedia] = React.useState("");
  const [xmlCircolari, setXmlCircolari] = React.useState("");
  function generaNiceName(testo) {
    // Rimuovi spazi e caratteri non desiderati
    var niceName = testo
      ? testo
          .toLowerCase() // Converti tutto in minuscolo
          .replace(/\s+/g, "-") // Sostituisci gli spazi con trattini
          .replace(/[^a-z0-9-]/g, "") // Rimuovi caratteri non alfanumerici tranne trattini
      : "";
    return niceName;
  }
  function createItemsFromArray(array) {
    let items = "";
    let controll = [];
    console.log('partito')
    array.slice(0, 40).forEach((obj, index) => {
   
      const title = obj['title'];
      // const giorniDaSottrarre = index + 1;
      // const num = obj.num
      // const date =
      //   new Date(moment(obj["date"], "YYYY-MM-DD HH:mm:ss").format()) ||
      //   new Date().toUTCString();
      // const date2 = moment(obj['date'], "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
      // const date =
      //   new Date(moment().subtract(giorniDaSottrarre, 'days').format()) ||
      //   new Date().toUTCString();
      // const date2 = moment().subtract(giorniDaSottrarre, 'days').format(
      //   "YYYY-MM-DD HH:mm:ss"
      // );
      // const dateProt = moment(obj['Data di registrazione'], "DD/MM/YYYY").format("DD-MM-YYYY");
      // // const protocollo = obj["Protocollo"] ? obj["Protocollo"] : "";

      // const singleMediaString = () => {
      //   let Fstring = "";
    
      //     var stringg = "";
      //     let iddd = getItemById(xml, obj.allegato.slice(0, 10)).id;
      //     let strMedia = getItemById(xml, obj.allegato.slice(0, 10)).strNum;
      //     let url = getItemById(xml, obj.allegato.slice(0, 10)).url;
      //     stringg = `i:${+iddd};s:${+strMedia}:"${url}";`;
      //     Fstring += stringg;
      
      
      //   return Fstring
      // };

      const era = () => {
       let era = obj?.era ? obj?.era[0] : ""
         let iddd = 
         getEra(xmlEra, era);
     
          // console.log("era:",obj.era || "")
        return iddd
      };
      // console.log(era())
      const mediaString = () => {
        let url = "";
        if(obj.attachments && obj.attachments[0]?.file)
      // {  obj.attachments.map((idd) => {
      {  
        const percorsoFile = obj.attachments[0].file;

// Dividi il percorso del file in base al carattere "/"
const partiPercorso = percorsoFile.split("/");

// Prendi l'ultima parte del percorso (il nome del file)
const nomeFile = partiPercorso[partiPercorso.length - 1];
console.log(nomeFile)
          var stringg = "";
          // let iddd = getItemById(xmlMedia, idd["file"].split("/")[-1]).id;
          // let strMedia = getItemById(xmlMedia, nomeFile).strNum;
          url = getItemById(xmlMedia, nomeFile).url;
          // stringg = `i:${+iddd};s:${+strMedia}:"${url}";`;
          // stringg = ` a:3:{s:5:"title";s:0:"";s:3:"url";s:${+strMedia}:"${url}";s:6:"target";s:0:"";}`
          // Fstring += stringg;
        }
        
        // )}
        return url
        ;}
        const tumb = () => {
          let iddd = "";
          if(obj.thumbnail)
        // {  obj.attachments.map((idd) => {
        {  
          const percorsoFile = obj.thumbnail
  
  // Dividi il percorso del file in base al carattere "/"
  const partiPercorso = percorsoFile.split("/");
  
  // Prendi l'ultima parte del percorso (il nome del file)
  const nomeFile = partiPercorso[partiPercorso.length - 1];
  console.log(nomeFile)
            var stringg = "";
              iddd = getItemById(xmlMedia, nomeFile).id;
           
          }
          
          // )}
          return iddd
          ;}
        // console.log(tumb)
        controll.push(tumb())
      
      //   const fileString = () => {
      //     let Fstring = "";
      //     obj.media.map((idd) => {
      //       var stringg = "";
      //       // let iddd = getItemById(xml, idd["name"].slice(0, 10)).id;
      //       // let strMedia = getItemById(xml, idd["name"].slice(0, 10)).strNum;
      //       // let url = getItemById(xml, idd["name"].slice(0, 10)).url;
      //       stringg = `<a href="${idd}">${idd.split('/').pop()}</a><br></br>`;
      //       Fstring += stringg;
      //     })
      //     return Fstring
      //     ;}

      // const idMedia = getItemById(xml, obj["allegati"].slice(0, -4)).id;
      // const urlMedia = getItemById(xml, obj["allegati"].slice(0, -4)).url;
      // const strMedia = getItemById(xml, obj["allegati"].slice(0, -4)).strNum;

      // controll.push({title,date,date2,media:singleMediaString()});
      const item = `

   
      <item>
      <title><![CDATA[${title}]]></title>
  
      <pubDate>Fri, 23 Feb 2024 16:21:09 +0000</pubDate>
      <dc:creator><![CDATA[dario.vettura@arsdigitalia.it]]></dc:creator>

      <description></description>
      <content:encoded><![CDATA[<!-- wp:paragraph -->
  <p>${obj?.body}</p>
  <!-- /wp:paragraph -->
  
  <!-- wp:post-featured-image /-->]]></content:encoded>
      <excerpt:encoded><![CDATA[]]></excerpt:encoded>

      <wp:post_date><![CDATA[2024-02-23 16:21:09]]></wp:post_date>
      <wp:post_date_gmt><![CDATA[2024-02-23 16:21:09]]></wp:post_date_gmt>
      <wp:post_modified><![CDATA[2024-02-24 10:15:45]]></wp:post_modified>
      <wp:post_modified_gmt><![CDATA[2024-02-24 10:15:45]]></wp:post_modified_gmt>
      <wp:comment_status><![CDATA[open]]></wp:comment_status>
      <wp:ping_status><![CDATA[open]]></wp:ping_status>
    
      <wp:status><![CDATA[publish]]></wp:status>
      <wp:post_parent>0</wp:post_parent>
      <wp:menu_order>0</wp:menu_order>
      <wp:post_type><![CDATA[post]]></wp:post_type>
      <wp:post_password><![CDATA[]]></wp:post_password>
      <wp:is_sticky>0</wp:is_sticky>
                      <category domain="category" nicename="uncategorized"><![CDATA[Uncategorized]]></category>
      <category domain="language" nicename="zh"><![CDATA[中文 (中国)]]></category>
              <wp:postmeta>
      <wp:meta_key><![CDATA[_edit_last]]></wp:meta_key>
      <wp:meta_value><![CDATA[1]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[creator]]></wp:meta_key>
      <wp:meta_value><![CDATA[1239]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_creator]]></wp:meta_key>
      <wp:meta_value><![CDATA[field_65d8b53e6ef5d]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[themes]]></wp:meta_key>
      <wp:meta_value><![CDATA[23]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_themes]]></wp:meta_key>
      <wp:meta_value><![CDATA[field_65d8c46281b36]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[era]]></wp:meta_key>
      <wp:meta_value><![CDATA[${era()}]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_era]]></wp:meta_key>
      <wp:meta_value><![CDATA[field_65d8c49732062]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[attachments_title]]></wp:meta_key>
      <wp:meta_value><![CDATA[file]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_attachments_title]]></wp:meta_key>
      <wp:meta_value><![CDATA[field_65d8c508de0b4]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[attachments_type]]></wp:meta_key>
      <wp:meta_value><![CDATA[pdf]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_attachments_type]]></wp:meta_key>
      <wp:meta_value><![CDATA[field_65d8c53ede0b5]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[attachments_file]]></wp:meta_key>
      <wp:meta_value><![CDATA[${mediaString()}]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_attachments_file]]></wp:meta_key>
      <wp:meta_value><![CDATA[field_65d8c55dde0b6]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[attachments]]></wp:meta_key>
      <wp:meta_value><![CDATA[]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_attachments]]></wp:meta_key>
      <wp:meta_value><![CDATA[field_65d8c4ecde0b3]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_thumbnail_id]]></wp:meta_key>
      <wp:meta_value><![CDATA[${+tumb()}]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_pingme]]></wp:meta_key>
      <wp:meta_value><![CDATA[1]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_encloseme]]></wp:meta_key>
      <wp:meta_value><![CDATA[1]]></wp:meta_value>
      </wp:postmeta>
                </item>
             


    
     
      `;
      // <wp:meta_value><![CDATA[a:1:{i:${+idMedia};s:${strMedia}:"${urlMedia}";}]]></wp:meta_value>
      // <item>
      // <title><![CDATA[${title}]]></title>

      // <pubDate>${date}</pubDate>
      // <dc:creator><![CDATA[adminweb_4y01udgy]]></dc:creator>
     
      // <description></description>
      // <content:encoded><![CDATA[${obj["body"]} ${obj["allegati"]}]]></content:encoded>
      // <excerpt:encoded><![CDATA[]]></excerpt:encoded>
  
      // <wp:post_date><![CDATA[${date2}]]></wp:post_date>
      // <wp:post_date_gmt><![CDATA[${date2}]]></wp:post_date_gmt>
      // <wp:post_modified><![CDATA[${date2}]]></wp:post_modified>
      // <wp:post_modified_gmt><![CDATA[${date2}]]></wp:post_modified_gmt>
      // <wp:comment_status><![CDATA[closed]]></wp:comment_status>
      // <wp:ping_status><![CDATA[closed]]></wp:ping_status>
     
      // <wp:status><![CDATA[publish]]></wp:status>
      // <wp:post_parent>0</wp:post_parent>
      // <wp:menu_order>0</wp:menu_order>
      // <wp:post_type><![CDATA[documento]]></wp:post_type>
      // <wp:post_password><![CDATA[]]></wp:post_password>
      // <wp:is_sticky>0</wp:is_sticky>
      //                 <category domain="tipologia-documento" nicename="albo-online"><![CDATA[Albo online]]></category>
      // <category domain="post_tag" nicename="albo-online"><![CDATA[Albo-online]]></category>
      // <category domain="albo-pretorio" nicename="${generaNiceName(obj["Categoria"])}"><![CDATA[${obj["Categoria"]}]]></category>
      //         <wp:postmeta>
      // <wp:meta_key><![CDATA[_edit_last]]></wp:meta_key>
      // <wp:meta_value><![CDATA[1]]></wp:meta_value>
      // </wp:postmeta>
      //           <wp:postmeta>
      // <wp:meta_key><![CDATA[delivery]]></wp:meta_key>
      // <wp:meta_value><![CDATA[0]]></wp:meta_value>
      // </wp:postmeta>
      //           <wp:postmeta>
      // <wp:meta_key><![CDATA[_delivery]]></wp:meta_key>
      // <wp:meta_value><![CDATA[field_63725630547a0]]></wp:meta_value>
      // </wp:postmeta>
      //           <wp:postmeta>
      // <wp:meta_key><![CDATA[_dsi_documento_descrizione]]></wp:meta_key>
      // <wp:meta_value><![CDATA[${title}]]></wp:meta_value>
      // </wp:postmeta>
      //           <wp:postmeta>
      // <wp:meta_key><![CDATA[_dsi_documento_numerazione_albo]]></wp:meta_key>
      // <wp:meta_value><![CDATA[${obj["Numero Albo"]}]]></wp:meta_value>
      // </wp:postmeta>
      //           <wp:postmeta>
      // <wp:meta_key><![CDATA[_dsi_documento_is_amministrazione_trasparente]]></wp:meta_key>
      // <wp:meta_value><![CDATA[false]]></wp:meta_value>
      // </wp:postmeta>
      //           </item>
      items += item;
    });
    console.log(controll);
    return items;
  }

    function getEra(xmlString, searchString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const items = xmlDoc.querySelectorAll("item");

    let id = "";

console.log(searchString);
    for (let i = 0; i < items.length; i++) {
   if(searchString){
      const titleElement = items[i].querySelector("post_name");
      if (titleElement && titleElement.textContent.includes(searchString)) {
        const postIdElement = items[i].querySelector("post_id");
        if (postIdElement && postIdElement.textContent) {
          id = postIdElement.textContent;
          console.log(id)
        }
        // const urlElement = items[i].querySelector("attachment_url");
     
        i = items.length;}
      }
    }

    return { id };
  }

  function getItemById(xmlString, searchString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const items = xmlDoc.querySelectorAll("item");

    let id = "";
    let url = "";
    let strNum = 0;

    for (let i = 0; i < items.length; i++) {
      const titleElement = items[i].querySelector("meta_value");
      if (titleElement && titleElement.textContent.includes(searchString)) {
        const postIdElement = items[i].querySelector("post_id");
        if (postIdElement && postIdElement.textContent) {
          id = postIdElement.textContent;
        }
        const urlElement = items[i].querySelector("attachment_url");
        if (urlElement && urlElement.textContent) {
          url = urlElement.textContent;
          strNum = urlElement.textContent.length;
        }
        i = items.length;
      }
    }

    return { id, url, strNum };
  }

  React.useEffect(() => {
    let xmls = "";

    axios
      .get(XMLEra, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        // console.log('Your xml file as string', response.data);
        xmls = response.data;
        setXmlEra(response.data);
        // console.log ( getItemById(xml,"Riattivazione").id)
        // console.log ( getItemById(xml,"Riattivazione").url)
        // console.log ( getItemById(xml,"Riattivazione").strNum)
      });
  }, []);
  React.useEffect(() => {
    let xmls = "";

    axios
      .get(XMLMedia, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        // console.log('Your xml file as string', response.data);
        xmls = response.data;
        setXmlMedia(response.data);
        // console.log ( getItemById(xml,"Riattivazione").id)
        // console.log ( getItemById(xml,"Riattivazione").url)
        // console.log ( getItemById(xml,"Riattivazione").strNum)
      });
  }, []);

//   React.useEffect(() => {
//     axios
//       .get(XMLCircolari, {
//         "Content-Type": "application/xml; charset=utf-8",
//       })
//       .then((response) => {
//         // const parsedCircolari = parseXmlCircolari(response.data);
//         // console.log(parsedCircolari);
//         setXmlCircolari(response.data);
//       });
 
//   }, []);

//   React.useEffect(() => {
//     if (xmlCircolari && xml) {
//       const parsedCircolari = parseXmlCircolari(xmlCircolari, xml);
//       setData(parsedCircolari);
//       console.log(parsedCircolari)
//     }
//   }, [xmlCircolari, xmlMediaVecchi]);

//   function getItemsFromXml(xmlString) {
//     // Creare un parser XML
//     var parser = new DOMParser();

//     // Parse del testo XML
//     var xmlDoc = parser.parseFromString(xmlString, "text/xml");

//     // Ottenere tutti gli elementi <item>
//     var items = xmlDoc.getElementsByTagName("item");

//     // Filtrare gli elementi che soddisfano le condizioni specificate
//     var filteredItems = Array.from(items).filter(function(item) {
//         // Verificare la presenza della categoria "tipologia-documento"
//         var tipologiaDocumentoCategory = Array.from(item.getElementsByTagName("category")).some(function(category) {
//             return category.textContent === "Documento Generico" && category.getAttribute("domain") === "tipologia-documento";
//         });

//         // Verificare la presenza della categoria "amministrazione-trasparente"
//         const postmetaNodes = item.getElementsByTagNameNS("*", "postmeta");


//         const hasIdentificativo = Array.from(postmetaNodes).some((postmetaNode) => {
//           const metaKeyNode = postmetaNode.querySelector("*|meta_key");
//           const metaValueNode = postmetaNode.querySelector("*|meta_value");
      
//           if (metaKeyNode && metaValueNode) {
//               const metaKey = metaKeyNode.textContent === "_dsi_documento_is_amministrazione_trasparente";
//               const metaValue = metaValueNode.textContent === "true";
//               return metaKey && metaValue;
//           }
      
//           return false;
//       });

//         // Restituire true solo se entrambe le condizioni sono soddisfatte
//         return tipologiaDocumentoCategory && hasIdentificativo;
//     });

//         // Convertire gli elementi filtrati in una singola stringa HTML
//         var resultHtml = Array.from(filteredItems).map(function(item) {
//           return new XMLSerializer().serializeToString(item);
//       }).join('');
  
//     // Restituire gli elementi filtrati in console
//     console.log(resultHtml);
// }

// const parseXmlCircolari = (xmlCircolari, xmlMediaVecchi) => {
//   const parser = new DOMParser();
//   const circolariDoc = parser.parseFromString(xmlCircolari, "text/xml");
//   const mediaVecchiDoc = parser.parseFromString(xmlMediaVecchi, "text/xml");

//   const circolariItems = circolariDoc.querySelectorAll("item");
//   const circolari = Array.from(circolariItems).map((item) => {
//     const id = item.querySelector("post_id").textContent;
//     const title = item.querySelector("title").textContent;
//     const content = item.querySelector("content").textContent;
//     const date = item.querySelector("post_date").textContent;
//     const categoryNodes = item.querySelectorAll("category");
//     const category = Array.from(categoryNodes).map(
//       (node) => node.textContent
//     );

//     const mediaIds = parseMedia(id, mediaVecchiDoc);

//     return {
//       id: id,
//       title: title,
//       content: content,
//       date: date,
//       category: category,
//       media: mediaIds,
//     };
//   });

//   return circolari;
// };

// // Esempio di utilizzo con il contenuto del file XML come stringa
// var xmlString = '<root>... il tuo XML qui ...</root>';

// function findMissingNumbersInPostmeta(xmlDoc) {
//   const parser = new DOMParser();
//   const DocDoc = parser.parseFromString(xmlDoc, "text/xml");

//   const DocItems = DocDoc.querySelectorAll("item");

//   // Inizializzare un array per memorizzare i numeri mancanti
//   var missingNumbers = [];

//   // Creare un set per tracciare i numeri presenti
//   var presentNumbers = new Set();

//   DocItems.forEach((item) => {
//       const postmetaNodes = item.querySelectorAll("postmeta");

//       // Verifica se c'è almeno un postmeta con le condizioni desiderate
//       const hasIdentificativo = Array.from(postmetaNodes).some((postmetaNode) => {
//           const metaKey = postmetaNode.querySelector("meta_key").textContent;
//           const metaValue = postmetaNode.querySelector("meta_value").textContent;

//           return metaKey === "_dsi_documento_identificativo" && metaValue !== "";
//       });

//       if (hasIdentificativo) {
//           // Se ci sono condizioni desiderate, popola il set con i numeri presenti
//           const number = parseInt(Array.from(postmetaNodes).find(node => node.querySelector("meta_key").textContent === "_dsi_documento_identificativo").querySelector("meta_value").textContent, 10);
//           presentNumbers.add(number);
//       }
//   });

//   // Controllare tutti i numeri nell'intervallo da 1 a 450
//   for (var i = 1; i <= 450; i++) {
//       // Se il numero non è presente, aggiungerlo all'array dei mancanti
//       if (!presentNumbers.has(i)) {
//           missingNumbers.push(i);
//       }
//   }

//   // Stampare l'array dei numeri mancanti in console
//   console.log(missingNumbers);
// }

// // Esempio di utilizzo con il contenuto del file XML come stringa

// const parseMedia = (parentId, mediaVecchiDoc) => {
//   const parser = new DOMParser();
//   const mediaItemsVecchi = mediaVecchiDoc.querySelectorAll("item");

//   const mediaIds = Array.from(mediaItemsVecchi)
//     .filter(
//       (item) => item.querySelector("post_parent").textContent === parentId
//     )
//     .map((item) => item.querySelector("attachment_url").textContent);

//   return mediaIds;
// };


  return (
    <div className="App">
      <button
        onClick={() => console.log(createItemsFromArray(albi))}
      >
        clicca per xml
      </button>
      <button
        onClick={() => {
          // getItemsFromXml(xml);
        }}
      >
        clicca per array
      </button>
    </div>
  );
}

export default App;
