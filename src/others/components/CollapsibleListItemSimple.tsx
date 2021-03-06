import { useState } from "react";
import { useTranslation } from "react-i18next";
import Box, { BoxProps } from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { DonationPoint } from "../fixtures/realData";
import { Coordinates } from "./CollapsibleList";

export type ListItem = {
  data: DonationPoint;
  wrapperProps?: BoxProps;
};

interface CollapsibleListItemProps extends ListItem {
  open: boolean;
  handleClick: () => void;
  selectedCity?: Coordinates;
  toggleZoomCity: (coordinates: Coordinates) => void;
}

export const CollapsibleListItem = ({
  data,
  open,
  handleClick,
  wrapperProps,
  selectedCity,
  toggleZoomCity,
  ...rest
}: CollapsibleListItemProps) => {
  const [showZoomIcon, setShowZoomIcon] = useState(false);
  const { t } = useTranslation();
  const [zoomIcon, setZoomIcon] = useState<"zoomIn" | "zoomOut">("zoomIn");

  const onTableRowMouseEnter = () => {
    if (data.coordinates) {
      const { latitude, longitude } = data.coordinates;

      setShowZoomIcon(true);

      if (selectedCity === undefined || (selectedCity?.latitude !== latitude && selectedCity?.longitude !== longitude)) {
        setZoomIcon("zoomIn");
      } else {
        setZoomIcon("zoomOut");
      }
    }
  };

  return (
    <>
      <TableRow
        className="table-row"
        sx={{ width: "100%", "& > *": { borderBottom: "unset", paddingY: 1 } }}
        onMouseEnter={onTableRowMouseEnter}
        onMouseLeave={() => setShowZoomIcon(false)}
      >
        <TableCell className="arrow-icon" sx={{ padding: 0, width: 6 }}>
          <IconButton aria-label="expand row" size="small" onClick={handleClick}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell className="cell-name" align="left" component="th" scope="row">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* TODO: that should be bold */}
            <Typography variant="subtitle1" gutterBottom component="div" sx={{ margin: 0 }}>
              {data.name}
            </Typography>
            {showZoomIcon && (
              <IconButton
                color="primary"
                aria-label="Zoom to city"
                component="span"
                onClick={() => toggleZoomCity(data.coordinates!)}
                sx={{ padding: "0 5px" }}
              >
                {zoomIcon === "zoomOut" ? <ZoomOutIcon /> : <ZoomInIcon />}
              </IconButton>
            )}
          </Box>
        </TableCell>

        <TableCell align="right">
          <Typography variant="subtitle1" gutterBottom component="div" sx={{ margin: 0 }}>
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          {/* TODO: open should be in lighter gray */}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {data.description}
              <br/>
              <b>{t("address")}</b> {data.address}<br/>
              <b>{t("contact_name")}</b> {data.contactName}<br/>
              <b>{t("phone_number")}</b> {data.phoneNumber}<br/>
              <b>{t("opening_hours")}</b> {data.openingHours}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
