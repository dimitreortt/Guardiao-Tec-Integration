import { ButtonBase, Collapse, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { isThisWeek, isToday } from "date-fns";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../application/store/configureStore";
import { PlanningReportValues } from "../../../domain/entities/Report";
import { listenReports } from "../../../infra/services/listenReports";
import { TMSErrorsReport } from "./TMSErrorsReport";
import { TMSSuccessReport } from "./TMSSuccessReport";
import { ExportButton } from "./ExportButton";
import { selectCurrentRelatedCompanyId } from "../../../infra/services/selectCurrentRelatedCompanyId";

type Props = {
  periodFilter?: "hoje" | "semana" | "geral";
};

export const TMSReport: FunctionComponent<Props> = ({ periodFilter }) => {
  const [showPanel, setShowPanel] = useState({ error: false, success: false });
  // const [reports, setReports] = useState<ReportValues[]>([]);
  const reports = useSelector((state: RootState) => state.tms.reports);
  const [filtered, setFiltered] = useState<PlanningReportValues[]>([]);
  const selectedCompanyId = useSelector(
    (state: RootState) => state.companies.adminSelectedCompanyId
  );

  useEffect(() => {
    // fetchReports(setReports);
    // listenReports(setReports);
    listenReports();
  }, []);

  const filterByDay = (reports: PlanningReportValues[]) =>
    reports.filter((r) => isToday(r.horarioEnvio));

  const filterByWeek = (reports: PlanningReportValues[]) =>
    reports.filter((r) => isThisWeek(r.horarioEnvio));

  const sortByDate = (r1: PlanningReportValues, r2: PlanningReportValues) =>
    //@ts-ignore
    r1.aberturaLinha - r2.aberturaLinha;

  useEffect(() => {
    let filtered: PlanningReportValues[] = reports;

    const selectedCompanyId = selectCurrentRelatedCompanyId();

    if (selectedCompanyId && selectedCompanyId !== "Todas") {
      filtered = reports.filter((r) => r.transpId === selectedCompanyId);
    }
    if (periodFilter === "hoje") filtered = filterByDay(filtered);
    if (periodFilter === "semana") filtered = filterByWeek(filtered);
    if (periodFilter === "geral") filtered = filtered;

    console.log("to aqui");
    // setFiltered(filtered.sort(sortByDate));
    setFiltered(filtered);
  }, [reports, selectedCompanyId]);

  const expand = (panel: "error" | "success") => {
    const newState = {
      ...showPanel,
      [panel]: !showPanel[panel],
    };
    setShowPanel(newState);
  };

  const handleExport = () => {
    console.log(filtered);
  };

  return (
    <div>
      <Box sx={{}}>
        <ExportButton companyName={"name"} reports={filtered} />
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
                {filtered.filter((r) => r.resultado === "Erro").length}
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
                {filtered.filter((r) => r.resultado === "Sucesso").length}
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
