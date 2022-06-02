import { ButtonBase, Collapse, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { isThisWeek, isToday } from "date-fns";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/store/configureStore";
import { ReportValues } from "../../../domain/entities/Report";
import { fetchReports } from "../../../infra/services/fetchReports";
import { selectCurrentRelatedCompanyId } from "../../../infra/services/selectCurrentRelatedCompanyId";
import { TMSErrorsReport } from "./TMSErrorsReport";
import { TMSSuccessReport } from "./TMSSuccessReport";

type Props = {
  data: {
    error: number;
    success: number;
  };
  periodFilter?: "hoje" | "semana" | "geral";
};

export const TMSReport: FunctionComponent<Props> = ({ data, periodFilter }) => {
  const [showPanel, setShowPanel] = useState({ error: false, success: false });
  const [reports, setReports] = useState<ReportValues[]>([]);
  const [filtered, setFiltered] = useState<ReportValues[]>([]);
  const selectedCompanyId = useSelector(
    (state: RootState) => state.companies.adminSelectedCompanyId
  );

  console.log(filtered);

  useEffect(() => {
    fetchReports(setReports);
  }, []);

  const filterByDay = (reports: ReportValues[]) =>
    reports.filter((r) => isToday(r.createdAt));

  const filterByWeek = (reports: ReportValues[]) =>
    reports.filter((r) => isThisWeek(r.createdAt));

  useEffect(() => {
    let filtered: ReportValues[] = reports;

    if (selectedCompanyId && selectedCompanyId !== "Todas") {
      filtered = reports.filter((r) => r.transpId === selectedCompanyId);
    }
    if (periodFilter === "hoje") filtered = filterByDay(filtered);
    if (periodFilter === "semana") filtered = filterByWeek(filtered);
    if (periodFilter === "geral") filtered = filtered;

    setFiltered(filtered);
  }, [reports, selectedCompanyId]);

  const expand = (panel: "error" | "success") => {
    const newState = {
      ...showPanel,
      [panel]: !showPanel[panel],
    };
    setShowPanel(newState);
  };

  return (
    <div>
      <Box sx={{}}>
        <Box
          sx={{
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            borderColor: "red",
            borderRadius: "3px",
            borderWidth: "1px",
            borderBlockStyle: "solid",
            padding: 1,
            mb: 1,
            // color: "white",
          }}
        >
          <Box
            sx={{
              // "&:hover": { cursor: "pointer" },
              width: "100%",
            }}
          >
            <ButtonBase
              sx={{ width: "100%", textAlign: "start" }}
              onClick={() => expand("error")}
            >
              <Typography
                component={"span"}
                sx={{
                  fontSize: 20,
                  "&:hover": { cursor: "pointer" },
                  width: "100%",
                }}
              >
                Erros de TMS:{" "}
                {filtered.filter((r) => r.status === "error").length}
              </Typography>
            </ButtonBase>
          </Box>
          <Collapse in={showPanel["error"]}>
            <TMSErrorsReport reports={filtered} />
          </Collapse>
        </Box>
        <Box
          sx={{
            // backgroundColor: "rgba(0, 255, 0, 0.5)",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            borderColor: "green",
            borderRadius: "3px",
            borderWidth: "1px",
            borderBlockStyle: "solid",
            padding: 1,
            // color: "white",
          }}
        >
          <Box
            sx={{
              // "&:hover": { cursor: "pointer" },
              width: "100%",
            }}
          >
            <ButtonBase
              sx={{ width: "100%", textAlign: "start" }}
              onClick={() => expand("success")}
            >
              <Typography
                component={"span"}
                sx={{
                  fontSize: 20,
                  "&:hover": { cursor: "pointer" },
                  width: "100%",
                }}
              >
                TMS com sucesso:{" "}
                {filtered.filter((r) => r.status === "success").length}
              </Typography>
            </ButtonBase>
            <Box>
              <Collapse in={showPanel["success"]}>
                <TMSSuccessReport reports={filtered} />
              </Collapse>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
