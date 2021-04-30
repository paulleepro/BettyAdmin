import { Box } from "@material-ui/core";
import { memo, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { Checkbox } from "../../../../components/Checkbox";

const FilterSectionContainer = styled.div``;
const FilterSectionHeader = styled.label`
  display: flex;
  align-items: center;

  background: #fff;
  cursor: pointer;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  margin-top: -1px;
  line-height: 1.25rem;
`;
const FilterSectionContent = styled(Box)`
  padding: 0.5rem 1rem;
  .sublabel {
    color: #858585;
  }
`;
type FilterSectionProps = {
  label: string;
  children: ReactNode;
  isVisible: boolean;
  onChange: (isChecked: boolean) => void;
};

export const FilterSection = memo((props: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(props.isVisible);
  useEffect(() => {
    props.onChange(isOpen);
  }, [isOpen]);
  return (
    <FilterSectionContainer>
      <FilterSectionHeader>
        <Checkbox
          checked={isOpen}
          onChange={(e) => setIsOpen(e.target.checked)}
          size="small" />

        {props.label}
      </FilterSectionHeader>
      {isOpen && <FilterSectionContent>{props.children}</FilterSectionContent>}
    </FilterSectionContainer>
  );
});
