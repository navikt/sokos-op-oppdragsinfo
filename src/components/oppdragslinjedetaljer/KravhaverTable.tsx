import { Table } from "@navikt/ds-react";
import apiService from "../../api/apiService";
import { Kravhaver } from "../../types/Kravhaver";
import { OppdragsIdent } from "../../types/OppdragsIdent";
import { formatDateTime, isEmpty } from "../../util/commonUtil";

export default function KravhaverTable(props: OppdragsIdent) {
  const { data } = apiService.useFetchKravhaver(
    props.oppdragsId,
    props.linjeId,
  );

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Linje-ID</Table.HeaderCell>
          <Table.HeaderCell scope="col">Kravhaver ID</Table.HeaderCell>
          <Table.HeaderCell scope="col">Dato FOM</Table.HeaderCell>
          <Table.HeaderCell scope="col">Tidspunkt registrert</Table.HeaderCell>
          <Table.HeaderCell scope="col">Bruker ID</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          Array.isArray(data) &&
          !isEmpty(data) &&
          data?.map((kravhaver: Kravhaver) => (
            <Table.Row key={btoa(kravhaver.linjeId)}>
              <Table.DataCell>{kravhaver.linjeId}</Table.DataCell>
              <Table.DataCell>{kravhaver.kravhaverId}</Table.DataCell>
              <Table.DataCell>{kravhaver.datoFom}</Table.DataCell>
              <Table.DataCell>
                {formatDateTime(kravhaver.tidspktReg)}
              </Table.DataCell>
              <Table.DataCell>{kravhaver.brukerid}</Table.DataCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}
