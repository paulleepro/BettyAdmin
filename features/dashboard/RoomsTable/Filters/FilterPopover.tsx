import { Box, Typography } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AutocompleteList } from "../../../../components/AutocompleteList";
import { Button } from "../../../../components/Button";
import { KeyboardDatePicker } from "../../../../components/KeyboardDatePicker";
import { laEndDay, laStartDay } from "../../constants/time";
import {
  handleRenderOption,
  renderHostInput,
  searchHosts,
} from "../../utils/hostsAutocomplete";
import { getOffsetMs } from "../../utils/date";
import { LA_TZ } from "../../constants/timezones";
import { FiltersProps, StyledFilters } from "./Filters";
import { FilterSection } from "./FilterSection";
import { FilterHeader, FilterHeaderTitle } from "./FilterHeader";
import { EnabledFilters, UpcomingRoomFilters } from "./types";
import { ShowPreview } from "./ShowPreview";

export function FilterPopover(props: FiltersProps) {
  const { shows, filters } = props;
  const laOffsetMs = getOffsetMs(LA_TZ);
  const [enabledFilters, setEnabledFilters] = useState<EnabledFilters>({
    show: Boolean(filters.shows?.length > 0),
    date: Boolean(filters.fromDate || filters.toDate),
    hosts: Boolean(filters.hosts?.length > 0),
  });
  const { watch, setValue, reset } = useForm<UpcomingRoomFilters>({
    defaultValues: {
      hostIds: filters.hostIds || [],
      hosts: filters.hosts || [],
      shows: filters.shows || [],

      // when submitting, dates are converted to LA time
      fromDate: filters.fromDate ? filters.fromDate - laOffsetMs : Date.now(),
      toDate: filters.toDate ? filters.toDate - laOffsetMs : Date.now(),
    },
  });
  const values = watch();

  const toggleFilter = (filter) => (enabled) => {
    setEnabledFilters({
      ...enabledFilters,
      [filter]: enabled,
    });
  };

  const handleHostsChange = (hostIds, hosts) => {
    setValue("hostIds", hostIds);
    setValue("hosts", hosts);
  };

  const handleShowsChange = (filtered) => {
    setValue("shows", filtered);
  };

  const handleCancel = () => {
    reset();
    props.onChange({});
  };

  const handleSubmit = () => {
    const vals: UpcomingRoomFilters = {};
    if (enabledFilters.date && values.fromDate && values.toDate) {
      vals.fromDate = laStartDay(new Date(values.fromDate));
      vals.toDate = laEndDay(new Date(values.toDate));
    }

    if (enabledFilters.show && values.shows.length) {
      vals.shows = values.shows;
    }

    if (enabledFilters.hosts && values.hostIds.length) {
      vals.hosts = values.hosts;
      vals.hostIds = values.hostIds;
    }

    props.onChange(vals);
  };

  return (
    <StyledFilters>
      <FilterHeader>
        <Button size="small" variant="outlined" onClick={handleCancel}>
          Clear
        </Button>
        <FilterHeaderTitle>Filters</FilterHeaderTitle>
        <Button
          color="secondary"
          size="small"
          variant="contained"
          onClick={handleSubmit}
        >
          Apply
        </Button>
      </FilterHeader>
      <FilterSection
        label="Date"
        isVisible={enabledFilters.date}
        onChange={toggleFilter("date")}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography className="sublabel">From</Typography>
          <Box bgcolor="#fff" width="10rem" marginBottom="0.5rem">
            <KeyboardDatePicker
              format="MM/dd/yyyy"
              fullWidth
              value={values.fromDate}
              onChange={(d) => setValue("fromDate", d?.getTime())}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography className="sublabel">To</Typography>
          <Box bgcolor="#fff" width="10rem">
            <KeyboardDatePicker
              format="MM/dd/yyyy"
              fullWidth
              value={values.toDate}
              onChange={(d) => setValue("toDate", d?.getTime())}
            />
          </Box>
        </Box>
      </FilterSection>
      <FilterSection
        label="Show"
        isVisible={enabledFilters.show}
        onChange={toggleFilter("show")}
      >
        <AutocompleteList
          addLabel="Add another show"
          renderInput={(show) => <ShowPreview show={show} />}
          renderOption={(show) => <div>{show}</div>}
          loadOptions={async (q) =>
            q.length
              ? shows.filter((s) => s.toLowerCase().includes(q.toLowerCase()))
              : []
          }
          defaultValue={values.shows || []}
          getOptionValue={(option) => option}
          onChange={handleShowsChange}
        />
      </FilterSection>
      <FilterSection
        label="Host"
        isVisible={enabledFilters.hosts}
        onChange={toggleFilter("hosts")}
      >
        <AutocompleteList
          addLabel="Add another host"
          renderInput={renderHostInput}
          renderOption={handleRenderOption}
          loadOptions={searchHosts}
          defaultValue={values.hosts || []}
          getOptionValue={(option) => option.id}
          onChange={handleHostsChange}
        />
      </FilterSection>
    </StyledFilters>
  );
}
