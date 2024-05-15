import { ChevronDownIcon } from "@navikt/aksel-icons";
import { Button, Dropdown } from "@navikt/ds-react";
import commonstyles from "../../util/common-styles.module.css";
import styles from "./RowsPerPageSelector.module.css";

const RowsPerPageSelector = ({
  rowsPerPage,
  setRowsPerPage,
}: {
  rowsPerPage: number;
  setRowsPerPage: (n: number) => void;
}) => {
  return (
    <>
      <div className={styles.rowsperpageselector}>
        <Dropdown>
          <Button
            size={"xsmall"}
            variant={"tertiary-neutral"}
            as={Dropdown.Toggle}
          >
            <ChevronDownIcon title="a11y-title" fontSize="1.5rem" />
          </Button>
          <Dropdown.Menu>
            <Dropdown.Menu.GroupedList>
              <Dropdown.Menu.GroupedList.Heading>
                Hvor mange rader ønsker du å vise per side?
              </Dropdown.Menu.GroupedList.Heading>
              <Dropdown.Menu.Divider />
              {[5, 10, 25, 50].map((n) => (
                <Dropdown.Menu.GroupedList.Item
                  key={n}
                  onClick={() => setRowsPerPage(n)}
                >
                  {n}
                </Dropdown.Menu.GroupedList.Item>
              ))}
            </Dropdown.Menu.GroupedList>
          </Dropdown.Menu>
        </Dropdown>
        <div className={commonstyles.nowrap}>
          <p>Vis {rowsPerPage} per side</p>
        </div>
      </div>
    </>
  );
};

export default RowsPerPageSelector;
