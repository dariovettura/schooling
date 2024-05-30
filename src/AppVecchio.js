import logo from "./logo.svg";
import "./App.css";

import XMLCircolari from "./ammini.xml";
import XMLMediaVecchi from "./mediaGaglione.xml";
import XMLMediaNuovi from "./mediaNuovi.xml";



// import albihtml from "./albi.html"
import React from "react";

import axios from "axios";
import moment from "moment";


// import "moment/locale/it";

function App() {
  const [xmlNews, setXmlNews] = React.useState("");
  const [xmlMediaVecchi, setXmlMediaVecchi] = React.useState("");
  const [xmlMediaNuovi, setXmlMediaNuovi] = React.useState("");
  const [xmlCircolari, setXmlCircolari] = React.useState("");
  const [xmlMediaImport, setXmlMediaImport] = React.useState("");
  
  const [arrCompleto, setArrayCompleto] = React.useState([]);

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

    array.forEach((obj, index) => {
      // const date =
      //   new Date(moment(obj["data"], "DD/MM/YYYY").format()) ||
      //   new Date().toUTCString();
      // const date2 = moment(obj['dataAtto'], "DD-MM-YYYY").format("YYYY-MM-DD HH:mm:ss");
      // const date3 = moment(obj['dataAtto'], "DD-MM-YYYY").format("YYYY");

      const date = moment(obj.date, "YYYY-MM-DD HH:mm:ss").format(
        "ddd, DD MMM YYYY HH:mm:ss Z"
      );

      const mediaString = () => {
        let Fstring = "";
        obj.media.map((el) => {
          var stringg = "";
          stringg = `i:${+el.id};s:${el.num}:"${el.guid}";`;
          Fstring += stringg;
        });
        return Fstring;
      };
      const categories = () => {
        let categoryTags = ""; // Inizializza una stringa vuota
      
        const parser = new DOMParser();
      
        obj.category.forEach(el => {
          let cat = `	<category domain="post_tag" nicename="${generaNiceName(el)}"><![CDATA[${el}]]></category>`;
          // switch (el) {
          //   case "Docenti":
          //     case "Personale ATA":
          //     cat = `<category domain="tipologia-circolare" nicename="circolari-per-docenti-e-personale-ata"><![CDATA[Circolari per docenti e personale ATA]]></category>`;
          //     break; // Aggiungi il break per terminare il caso
          //   case "Genitori":
          //   case "Studenti":
          //     cat = `<category domain="tipologia-circolare" nicename="circolari-per-alunni-e-famiglie"><![CDATA[Circolari per alunni e famiglie]]></category>`;
          //     break; // Aggiungi il break per terminare il caso
          //   default:
          //     // cat = `<category domain="tipologia-circolare" nicename="circolari-per-docenti-e-personale-ata"><![CDATA[Circolari per docenti e personale ATA]]></category><category domain="tipologia-circolare" nicename="circolari-per-alunni-e-famiglie"><![CDATA[Circolari per alunni e famiglie]]></category>`;
          //     break;
          // }
          
          if (cat) {
            const categoryDoc = parser.parseFromString(cat, "text/xml");
            categoryTags += categoryDoc.querySelector("category").outerHTML; // Aggiungi il tag XML alla stringa
          }
        });
      
        return categoryTags;
      };
      
      const item = `
      <item>
      <title><![CDATA[${obj.title.charAt(0).toUpperCase() + obj.title.slice(1).toLowerCase()}]]></title>
         
      <pubDate>${date}</pubDate>
      <dc:creator><![CDATA[adminweb_4y01udgy]]></dc:creator>
      <guid isPermaLink="false">https://icgaglionecapodrise.3dsolution.it/?p=217</guid>
      <description></description>
      <content:encoded><![CDATA[${obj.content}]]></content:encoded>
                    <excerpt:encoded><![CDATA[]]></excerpt:encoded>
               
                    <wp:post_date><![CDATA[${obj.date}]]></wp:post_date>
                    <wp:post_date_gmt><![CDATA[${obj.date}]]></wp:post_date_gmt>
                    <wp:post_modified><![CDATA[${obj.date}]]></wp:post_modified>
                    <wp:post_modified_gmt><![CDATA[${obj.date}]]></wp:post_modified_gmt>
      <wp:comment_status><![CDATA[closed]]></wp:comment_status>
      <wp:ping_status><![CDATA[closed]]></wp:ping_status>
  
      <wp:status><![CDATA[publish]]></wp:status>
      <wp:post_parent>0</wp:post_parent>
      <wp:menu_order>0</wp:menu_order>
      <wp:post_type><![CDATA[documento]]></wp:post_type>
      <wp:post_password><![CDATA[]]></wp:post_password>
      <wp:is_sticky>0</wp:is_sticky>
      
                      <category domain="tipologia-documento" nicename="pon"><![CDATA[PON]]></category>
      <category domain="post_tag" nicename="pon-programma-operativo-nazionale"><![CDATA[PON - Programma Operativo Nazionale]]></category>
      ${categories()}
              <wp:postmeta>
      <wp:meta_key><![CDATA[_edit_last]]></wp:meta_key>
      <wp:meta_value><![CDATA[1]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[delivery]]></wp:meta_key>
      <wp:meta_value><![CDATA[0]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_delivery]]></wp:meta_key>
      <wp:meta_value><![CDATA[field_63725630547a0]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_documento_descrizione]]></wp:meta_key>
      <wp:meta_value><![CDATA[${obj.title.charAt(0).toUpperCase() + obj.title.slice(1).toLowerCase()}]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_documento_numerazione_albo]]></wp:meta_key>
      <wp:meta_value><![CDATA[00001/2023]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_documento_is_amministrazione_trasparente]]></wp:meta_key>
      <wp:meta_value><![CDATA[false]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_documento_file_documenti]]></wp:meta_key>
      <wp:meta_value><![CDATA[a:${obj.media.length}:{${mediaString()}}]]></wp:meta_value>
      </wp:postmeta>
                </item>







      
      `;

      items += item;
    });
    console.log(controll);
    return items;
  }

  // function parseXmlCircolari(xmlCircolari) {
  //   const parser = new DOMParser();
  //   const xmlDoc = parser.parseFromString(xmlCircolari, "text/xml");
  //   const items = xmlDoc.querySelectorAll("item");

  //   const parsedItems = [];
  //   let resultString = "";

  //   for (const item of items) {
  //     // const category = item.querySelector("category[nicename='area-riservata']");

  //     // if(category)
  //    { const title = item.querySelector("title").textContent;
  //     const guid = item.querySelector("guid").textContent;
  //     const numberMatch = title.match(/\d+/);
  //     const number = numberMatch ? numberMatch[0] : "";

  //     // const pubDate = item.querySelector("pubDate").textContent;

  //     // const contentEncoded = item.querySelector("content").textContent;
  //     // const pTags = contentEncoded.match(/<p>(.*?)<\/p>/g);
  //     // const content = pTags
  //     //   ? pTags.map((pTag) => pTag.replace(/<\/?p>/g, "")).join(" ")
  //     //   : "";

  //     // const allegati = [];
  //     // const regex = /"id":(\d+),"href":"([^"]+)"/g;

  //     // const content2 = contentEncoded;
  //     // let match;
  //     // while ((match = regex.exec(content2)) !== null) {
  //     //   const id = match[1];
  //     //   let href = match[2];

  //     //   href = href.replace(
  //     //     "www.giordanidesanctis.edu.it",
  //     //     "giordanidesanctis.3dsolution.it"
  //     //   );

  //     //   // Conta il numero di lettere nell'href
  //     //   const numLetters = href.length;
  //     //   let str = numLetters;

  //     //   allegati.push({ id, href, str });
  //     // }

  //     resultString += `<strong>${title}</strong><br>`;
  //     resultString += `<a href="${guid}">${guid}</a><br><br>`;

  //     parsedItems.push({
  //       title,
  //       guid,
  //       // number,
  //       // pubDate,
  //       // content,
  //       // allegati,
  //     });}
  //   }

  //   return resultString;
  // }

  const [data, setData] = React.useState([]);

  // Esempio di utilizzo
  axios
    .get(XMLCircolari, {
      "Content-Type": "application/xml; charset=utf-8",
    })
    .then((response) => {
      setXmlCircolari(response.data);
      // const parsedCircolari = parseXmlCircolari(response.data);
      // console.log(parsedCircolari);
    });

  React.useEffect(() => {
    axios
      .get(XMLCircolari, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        // const parsedCircolari = parseXmlCircolari(response.data);
        // console.log(parsedCircolari);
        setXmlCircolari(response.data);
      });
    axios
      .get(XMLMediaVecchi, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        // const parsedCircolari = parseXmlCircolari(response.data);
        // console.log(parsedCircolari);
        setXmlMediaVecchi(response.data);
      });
    axios
      .get(XMLMediaNuovi, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        // const parsedCircolari = parseXmlCircolari(response.data);
        // console.log(parsedCircolari);
        setXmlMediaNuovi(response.data);
      });

      // axios
      // .get( XMLMediaImpoert, {
      //   "Content-Type": "application/xml; charset=utf-8",
      // })
      // .then((response) => {
      //   // const parsedCircolari = parseXmlCircolari(response.data);
      //   // console.log(parsedCircolari);
      //   setXmlMediaImport(response.data);
      // });
  }, []);

 


  React.useEffect(() => {
    if (xmlCircolari ) {
      const parsedCircolari = parseXmlDoc(xmlCircolari);
    
      console.log(parsedCircolari)
    }
  }, [xmlCircolari]);

  const parseXmlDoc = (xmlDoc) => {
    const parser = new DOMParser();
    const DocDoc = parser.parseFromString(xmlDoc, "text/xml");

    const DocItems = DocDoc.querySelectorAll("item");
    const Doc = Array.from(DocItems).map((item) => {
        const postmetaNodes = item.querySelectorAll("postmeta");

        // Verifica se c'è almeno un postmeta con le condizioni desiderate
        const hasAmministrazioneTrasparente = Array.from(postmetaNodes).some((postmetaNode) => {
            const metaKey = postmetaNode.querySelector("meta_key").textContent;
            const metaValue = postmetaNode.querySelector("meta_value").textContent;

            return metaKey === "_dsi_documento_is_amministrazione_trasparente" && metaValue === "true";
        });

        // Se l'item soddisfa le condizioni, restituisci un oggetto rappresentante l'item
        if (hasAmministrazioneTrasparente) {
            const result = {
                title: item.querySelector("title")?.textContent || '',
                link: item.querySelector("link")?.textContent || '',
                id: item.querySelector("post_id")?.textContent || '',
                post_name: item.querySelector("post_name")?.textContent || '',
                file_documenti: '',
                protocollo: '',
                data_protocollo: '',
                numerazione_albo: '',
            };

            // Aggiungi gli altri campi desiderati dal postmeta
            for (const postmetaNode of postmetaNodes) {
                const metaKey = postmetaNode.querySelector("meta_key")?.textContent || '';
                const metaValue = postmetaNode.querySelector("meta_value")?.textContent || '';

                switch (metaKey) {
                    case "_dsi_documento_file_documenti":
                        result.file_documenti = metaValue.trim();
                        break;
                    case "_dsi_documento_protocollo":
                        result.protocollo = metaValue.trim();
                        break;
                    case "_dsi_documento_data_protocollo":
                        result.data_protocollo = metaValue.trim();
                        break;
                    case "_dsi_documento_numerazione_albo":
                        result.numerazione_albo = metaValue.trim();
                        break;
                    // Aggiungi altri casi se necessario
                }
            }

            // Aggiungi la categoria
            const categoryNode = item.querySelector("category[domain='amministrazione-trasparente']");
            if (categoryNode) {
                result.category = categoryNode.textContent;
            } else {
                result.category = ''; // Se non c'è una categoria, assegna una stringa vuota
            }

            return result;
        } else {
            return null; // Se l'item non soddisfa le condizioni, restituisci null
        }
    }).filter((item) => item !== null).filter((item)=> item.category === "Atti delle amministrazioni aggiudicatrici e degli enti aggiudicatori distintamente per ogni procedura"
     || item.category === "Informazioni sulle singole procedure in formato tabellare"
     || item.category === "Bandi di gara e contratti"); // Filtra gli elementi null (quelli che non soddisfano le condizioni)

    return Doc;
};





  const parseMedia = (parentId, mediaVecchiDoc) => {
    const parser = new DOMParser();
    const mediaItemsVecchi = mediaVecchiDoc.querySelectorAll("item");

    const mediaIds = Array.from(mediaItemsVecchi)
      .filter(
        (item) => item.querySelector("post_parent").textContent === parentId
      )
      .map((item) => item.querySelector("post_id").textContent);

    return mediaIds;
  };

  const fetchAndSetMediaData = async () => {
    // Fetch xmlMediaNuovi
    // const response = await axios.get(XMLMediaNuovi, {
    //   "Content-Type": "application/xml; charset=utf-8",
    // });
    // const xmlMediaNuoviData = response.data;

    const parser = new DOMParser();
    const mediaNuoviDoc = parser.parseFromString(xmlMediaNuovi, "text/xml");

    const updatedData = await Promise.all(
      data.map(async (circolare) => {
        const mediaIds = circolare.media;
        const mediaObjects = await Promise.all(
          mediaIds.map(async (mediaId) => {
            const mediaItem = Array.from(
              mediaNuoviDoc.querySelectorAll("item")
            ).find(
              (item) => item.querySelector("post_id").textContent === mediaId
            );

            if (mediaItem) {
              const guid = mediaItem.querySelector("guid").textContent;
              const num = guid.length;

              return {
                id: mediaId,
                guid: guid,
                num: num,
              };
            }

            return null;
          })
        );

        const validMediaObjects = mediaObjects.filter(
          (media) => media !== null
        );

        return {
          ...circolare,
          media: validMediaObjects,
        };
      })
    );

    setData(updatedData);
    return updatedData;
  };

  return (
    <div className="App">
      <button
        onClick={() => {
          console.log(fetchAndSetMediaData());
        }}
      >
        clicca per array
      </button>

      <button
        onClick={() => {
          console.log(createItemsFromArray(data));
        }}
      >
        clicca per xml
      </button>
      {/* <Ok/> */}
    </div>
  );
}

export default App;

// articoli

{/* <item>
      <title><![CDATA[${obj.title.charAt(0).toUpperCase() + obj.title.slice(1).toLowerCase()}]]></title>
         
      <pubDate>${date}</pubDate>
      <dc:creator><![CDATA[adminweb_4y01udgy]]></dc:creator>
      <guid isPermaLink="false">https://icgaglionecapodrise.3dsolution.it/?p=217</guid>
      <description></description>
      <content:encoded><![CDATA[${obj.content}]]></content:encoded>
                    <excerpt:encoded><![CDATA[]]></excerpt:encoded>
               
                    <wp:post_date><![CDATA[${obj.date}]]></wp:post_date>
                    <wp:post_date_gmt><![CDATA[${obj.date}]]></wp:post_date_gmt>
                    <wp:post_modified><![CDATA[${obj.date}]]></wp:post_modified>
                    <wp:post_modified_gmt><![CDATA[${obj.date}]]></wp:post_modified_gmt>
      <wp:comment_status><![CDATA[closed]]></wp:comment_status>
      <wp:ping_status><![CDATA[closed]]></wp:ping_status>

      <wp:status><![CDATA[publish]]></wp:status>
      <wp:post_parent>0</wp:post_parent>
      <wp:menu_order>0</wp:menu_order>
      <wp:post_type><![CDATA[post]]></wp:post_type>
      <wp:post_password><![CDATA[]]></wp:post_password>
      <wp:is_sticky>0</wp:is_sticky>
              ${categories()}
      <category domain="tipologia-articolo" nicename="notizie"><![CDATA[Notizie]]></category>
              <wp:postmeta>
      <wp:meta_key><![CDATA[_edit_last]]></wp:meta_key>
      <wp:meta_value><![CDATA[1]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[delivery]]></wp:meta_key>
      <wp:meta_value><![CDATA[0]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_delivery]]></wp:meta_key>
      <wp:meta_value><![CDATA[field_63725630547a0]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_articolo_descrizione]]></wp:meta_key>
      <wp:meta_value><![CDATA[${obj.title.charAt(0).toUpperCase() + obj.title.slice(1).toLowerCase()}]]></wp:meta_value>
      </wp:postmeta>
                <wp:postmeta>
      <wp:meta_key><![CDATA[_dsi_articolo_file_documenti]]></wp:meta_key>
      <wp:meta_value><![CDATA[a:${obj.media.length}:{${mediaString()}}]]></wp:meta_value>
      </wp:postmeta>
                </item>              */}
                   