import { Box, Popover, Typography } from "@material-ui/core";
import { useRef, useState } from "react";
import styled from "styled-components";
import FilterIcon from "@material-ui/icons/FilterList";
import { Button } from "../../../../components/Button";

import { FilterPopover } from "./FilterPopover";
import { UpcomingRoomFilters } from "./types";

export const StyledFilters = styled(Box)`
  background: #f5f5f5;
  border-radius: 0.5rem;

  min-width: 17.5rem;

  overflow: hidden;
  user-select: none;
  z-index: 20;
`;

const FilterButton = styled(Button)`
  .label {
    margin-left: 0.25rem;
  }
`;

export type FiltersProps = {
  shows: string[];
  filters: UpcomingRoomFilters;
  onChange: (filters: UpcomingRoomFilters) => void;
};

export function Filters(props: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Box position="relative">
      <FilterButton
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        variant="outlined"
      >
        <FilterIcon fontSize="small" />
        Filters{" "}
        {Object.keys(props.filters).length > 0 && (
          <Typography color="primary" className="label">
            ({Object.keys(props.filters).length})
          </Typography>
        )}
      </FilterButton>
      <Popover
        elevation={0}
        open={isOpen}
        anchorEl={buttonRef.current}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <FilterPopover
          {...props}
          onChange={(val) => {
            setIsOpen(false);
            props.onChange(val);
          }}
        />
      </Popover>
    </Box>
  );
}
