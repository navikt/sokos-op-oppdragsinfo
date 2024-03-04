import { Button, Loader, Table } from "@navikt/ds-react";
import RestService from "../services/rest-service";
import EnhetshistorikkVisning from "../components/EnhetshistorikkVisning";
import StatushistorikkVisning from "../components/StatushistorikkVisning";
import OmposteringerVisning from "../components/OmposteringerVisning";
import styles from "./SokAndTreffliste.module.css";

const OppdragsdetaljerPage = ({
  gjelderId,
  id,
  handleSetLinjeId,
}: {
  gjelderId: string | undefined;
  id: string;
  handleSetLinjeId: (linjeid: string) => void;
}) => {
  const { oppdrag, oppdragIsLoading } = RestService.useFetchOppdrag(gjelderId, id);

  return (
    <>
      {oppdragIsLoading && <Loader size="3xlarge" title="Straks hold an" />}
      {!oppdrag && <div>Fant ikke oppdrag</div>}
      {!oppdragIsLoading && oppdrag && (
        <div className={styles.treffliste}>
          <EnhetshistorikkVisning id={id} />
          {gjelderId && <OmposteringerVisning gjelderId={gjelderId} id={id} />}
          <StatushistorikkVisning id={id} />
          {oppdrag?.enhet && <p>{"Enhet : " + oppdrag?.enhet?.enhet}</p>}
          {oppdrag?.behandlendeEnhet && <p>{"Behandlende: " + oppdrag?.behandlendeEnhet?.enhet}</p>}
          <Table zebraStripes>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell key={"linjeid"} scope="col">
                  Linje-ID
                </Table.HeaderCell>
                <Table.HeaderCell key={"kodeklasse"} scope="col">
                  Kodeklasse
                </Table.HeaderCell>
                <Table.HeaderCell key={"datovedtakfom"} scope="col">
                  Dato Vedtak FOM
                </Table.HeaderCell>
                <Table.HeaderCell key={"sats"} scope="col">
                  Sats
                </Table.HeaderCell>
                <Table.HeaderCell key={"typesats"} scope="col">
                  Type sats
                </Table.HeaderCell>
                <Table.HeaderCell key={"status"} scope="col">
                  Status
                </Table.HeaderCell>
                <Table.HeaderCell key={"DatoFOM"} scope="col">
                  Dato Fom
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {oppdrag?.oppdragsLinjer.map((linje) => (
                <Table.Row key={btoa("" + linje.linjeId)}>
                  <Table.DataCell>
                    <Button onClick={() => handleSetLinjeId("" + linje.linjeId)}>{linje.linjeId}</Button>
                  </Table.DataCell>
                  <Table.DataCell>{linje.kodeKlasse}</Table.DataCell>
                  <Table.DataCell>{linje.datoVedtakFom}</Table.DataCell>
                  <Table.DataCell>{linje.sats}</Table.DataCell>
                  <Table.DataCell>{linje.typeSats}</Table.DataCell>
                  <Table.DataCell>{linje.kodeStatus}</Table.DataCell>
                  <Table.DataCell>{linje.datoFom}</Table.DataCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </>
  );
};
export default OppdragsdetaljerPage;