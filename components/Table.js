import styled from "styled-components";
const TableWrapper = styled.div`
  overflow: hidden; 
  border-radius: 10px; 
  border: 1px solid #000;
`;

const StyledTable = styled.table`
width:100%;
text-align:left;
border-collapse: collapse;
th{
    background-color: #04AA6D;
    text-align:center;
    text-transform: uppercase;
    color:#000;
    font-weight:600;
    font-size: .9rem;
    &:last-child {
        text-align: left;
      }
      
}
tr{
    
    &:hover {
        background-color: #c8daf7;
      }
}
td{
    border-top: 1px solid rgba(0,0,0,1) ;
    text-align:center;
    &:last-child {
        text-align: left;
      }
      
}
`
export default function Table (props){
    return( 
    <TableWrapper>
        <StyledTable {...props} />
    </TableWrapper>
    )

}