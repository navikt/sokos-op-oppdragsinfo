import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useStore } from "../../store/AppState";
import commonstyles from "../../styles/common-styles.module.css";
import { isEmpty } from "../../util/commonUtil";
import { ROOT } from "../../util/constant";
import OppdragEgenskapPanel from "./OppdragEgenskapPanel";
import styles from "./OppdragPage.module.css";
import OppdragTable from "./OppdragTable";

export default function OppdragPage() {
  const navigate = useNavigate();
  const {
    gjelderId,
    fagGruppeVisningText,
    oppdragsListe,
    gjelderNavn,
    setGjelderNavn,
  } = useStore();

  useEffect(() => {
    if (!gjelderId || oppdragsListe === undefined || isEmpty(oppdragsListe)) {
      navigate(ROOT);
    }

    if (gjelderNavn === "") {
      apiService.useHentNavn({ gjelderId }).then((response) => {
        setGjelderNavn(response.navn);
      });
    }
  }, [navigate, gjelderId, gjelderNavn, oppdragsListe, setGjelderNavn]);

  return (
    <>
      <div className={commonstyles.pageheading}>
        <Heading level="1" size="large">
          Oppdragsinfo
        </Heading>
      </div>
      <div className={styles.oppdrag}>
        <div className={styles.oppdrag__top}>
          <Breadcrumbs searchLink treffliste />

          <div className={styles.oppdrag__top_info}>
            <OppdragEgenskapPanel
              gjelderId={gjelderId}
              navn={gjelderNavn}
              faggruppe={fagGruppeVisningText}
            />
          </div>
        </div>
        {!oppdragsListe ||
          (!isEmpty(oppdragsListe) && (
            <OppdragTable oppdragsListe={oppdragsListe} />
          ))}
      </div>
    </>
  );
}