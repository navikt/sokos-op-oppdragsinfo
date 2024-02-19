import { Button, GuidePanel, TextField } from "@navikt/ds-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { TrefflisteSearchParametersSchema } from "./Valideringsregler";
import MoneyBagSvg from "../images/money_bag.svg";
import { useState } from "react";
import RestService from "../services/rest-service";
import { Combobox, isEmpty } from "../util/commonUtils";
import TrefflisteVisning from "../components/TrefflisteVisning";

type TrefflisteParameters = {
  gjelderID?: string;
  faggruppe?: string;
};

const OppdragsinfoPage = () => {
  const { faggrupper, faggrupperIsLoading } = RestService.useFetchFaggrupper();
  const [trefflisteParameters, setTrefflisteParameters] = useState<TrefflisteParameters>({});
  const { treffliste, trefflisteIsLoading } = RestService.useFetchTreffliste(
    trefflisteParameters?.gjelderID,
    trefflisteParameters?.faggruppe,
  );
  const {
    register,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<TrefflisteParameters>({
    resolver: zodResolver(TrefflisteSearchParametersSchema),
  });

  const handleChangeGjelderId: SubmitHandler<TrefflisteParameters> = (data) => {
    setTrefflisteParameters({ ...trefflisteParameters, gjelderID: data.gjelderID?.replaceAll(/[\s.]/g, "") });
  };

  const handleChooseFaggruppe = (faggruppe: string, isSelected: boolean) => {
    setTrefflisteParameters({ ...trefflisteParameters, faggruppe: isSelected ? faggruppe : undefined });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleChangeGjelderId)}>
        <h1>Søk i Oppdrag</h1>

        <TextField {...register("gjelderID")} id="gjelderID" label="Gjelder" error={errors.gjelderID?.message} />

        {faggrupper && (
          <Combobox
            label={"Velg faggruppe"}
            clearButton={true}
            clearButtonLabel={"Foo"}
            onToggleSelected={handleChooseFaggruppe}
            options={faggrupper.map((f) => f.navn + "(" + f.type + ")")}
          />
        )}

        <Button size="small" iconPosition="right" icon={<MagnifyingGlassIcon />} onClick={() => trigger()}>
          Søk
        </Button>
      </form>

      <GuidePanel className="max-w-2xl" illustration={<img src={MoneyBagSvg} alt={"Pengepose"} />}>
        <p>faggrupperIsLoading er {faggrupperIsLoading ? "yup" : "nope"}</p>
        <p>
          Gjelder ID
          {errors.gjelderID ? " er det noe feil med" : getValues().gjelderID ?? "- ißkke skrevet noe ennå"}
        </p>
        <p>Faggruppe i trefflisteparameters er {trefflisteParameters.faggruppe}</p>
        <p>Gjelder ID i trefflisteparameters er "{trefflisteParameters.gjelderID}"</p>
        <p>trefflisteIsLoading er {trefflisteIsLoading ? "yup" : "nope"}</p>
      </GuidePanel>

      {treffliste && !isEmpty(treffliste) ? (
        <TrefflisteVisning
          key={btoa("" + trefflisteParameters.gjelderID + trefflisteParameters.faggruppe)}
          treffliste={treffliste}
        />
      ) : (
        "tom treffliste"
      )}
    </>
  );
};
export default OppdragsinfoPage;
