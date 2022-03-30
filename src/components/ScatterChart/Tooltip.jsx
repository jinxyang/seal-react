import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const StyledTitle = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 1.2em;
`
const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`
const StyledItem = styled.li`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;

  & + & {
    margin-top: 4px;
    padding-top: 4px;
    border-top: 1px solid rgba(0 0 0 / 5%);
  }
`
const StyledLabel = styled.span``
const StyledValue = styled.span`
  font-weight: bold;
  font-size: 1.1em;
`

const Tooltip = ({ param = {}, value: rawValue = [], list = [] }) => {
  const { seriesIndex, value, dataIndex } = param
  const { labelName, valueName, list: rawList } = rawValue[seriesIndex]
  const currentData = rawList[dataIndex]

  const tooltips = list.length
    ? [
        ..._.map(list, ([key, label], index) => ({
          label,
          value: value[index],
        })),
      ]
    : [
        { label: labelName, value: value[0] },
        { label: valueName, value: value[1] },
      ]
  return (
    <StyledWrap>
      <StyledTitle>{currentData.name}</StyledTitle>
      <StyledList>
        {_.map(tooltips, ({ label, value }, index) => (
          <StyledItem key={index}>
            <StyledLabel>{label?.label ?? label}</StyledLabel>
            <StyledValue>
              {_.isObject(label) ? label.formatter?.(currentData) : value}
            </StyledValue>
          </StyledItem>
        ))}
      </StyledList>
    </StyledWrap>
  )
}

export default Tooltip
