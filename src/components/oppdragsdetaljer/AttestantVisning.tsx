import { useRef } from "react";
import RestService from "../../services/rest-service";
import { Button, Modal, Table } from "@navikt/ds-react";
import { isArray } from "@grafana/faro-web-sdk";
import { isEmpty } from "../../util/commonUtils";
import { Attestant } from "../../models/Attestant";
import ContentLoader from "../common/ContentLoader";

const AttestantVisning = ({ oppdragsid, linjeid, tekst }: { oppdragsid: string; linjeid: string; tekst: string }) => {
  const [data, isLoading] = RestService.useFetchAttestant(oppdragsid, linjeid);
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button
        variant={"tertiary"}
        size="xsmall"
        onClick={() => {
          ref.current?.showModal();
        }}
      >
        {tekst}
      </Button>

      <Modal ref={ref} header={{ heading: "Attestant" }}>
        <Modal.Body>
          {isLoading ? (
            <ContentLoader width="215.6px" />
          ) : (
            <Table zebraStripes>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell key={"attestantId"} scope="col" children={"Attestant-ID"} />
                  <Table.HeaderCell key={"ugyldigFom"} scope="col" children={"ugyldigFom"} />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data &&
                  isArray(data) &&
                  !isEmpty(data) &&
                  data?.map((attestant: Attestant) => (
                    <Table.Row key={btoa(attestant.attestantId)}>
                      <Table.DataCell>{attestant.attestantId}</Table.DataCell>
                      <Table.DataCell>{attestant.ugyldigFom}</Table.DataCell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={() => ref.current?.close()}>
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AttestantVisning;
