import React, { useState, useMemo } from "react";
import { Paper, Box, Table, TableContainer } from "@mui/material";
import IPDCPrintHeader from "./IPDCPrintHeader";
import SearchAndFilter from "./Table/SearchAndFilter";
import TableHeader from "./Table/TableHeader";
import TableBodyComponent from "./Table/TableBodyComponent";
import TablePaginationComponent from "./Table/TablePaginationComponent";
//prettier-ignore
const IPDCFinalTable = React.forwardRef(
  (
    { data, setData, title, selectedColumns, isEditable = false, isDeletable = false, isSearchable = true, isMessage = false,
      showHeader = true, hasAttachment = false, attachmentLink = "", columnsToExclude = [], targetPoint = "", deleteKey = "",
      ...rest
    },
    ref,
  ) => {
    const [editingRowIndex, setEditingRowIndex] = useState(null);
    const [editingData, setEditingData] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [filterColumn, setFilterColumn] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Memoize filtered data to optimize performance
    const filteredData = useMemo(() => {
      if (!data || data.length === 0) return [];
      const normalizedQuery = searchQuery?.toLowerCase()?.trim();
      return data.filter(row => {
        if (!normalizedQuery) return true; // No filtering if query is empty

        if (filterColumn) {
          const cellValue = row[filterColumn]?.toString()?.toLowerCase()?.trim();
          return cellValue?.includes(normalizedQuery);
        }

        // If no specific filter column, search across selected columns
        return selectedColumns.some(column => {
          const cellValue = row[column]?.toString()?.toLowerCase()?.trim();
          return cellValue?.includes(normalizedQuery);
        });
      });
    }, [data, searchQuery, filterColumn, selectedColumns]);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const paginatedData = useMemo(
      () => filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
      [filteredData, page, rowsPerPage],
    );

    return (
      <Paper ref={ref}>
        <Box p={2}>
          {showHeader && <IPDCPrintHeader title={title} />}
          {isSearchable && data.length > 0 && (
            <Box className="no-print" sx={{ pb: 2 }}>
              <SearchAndFilter
                columns={Object.keys(data[0])}
                searchQuery={searchQuery}
                filterColumn={filterColumn}
                setSearchQuery={setSearchQuery}
                setFilterColumn={setFilterColumn}
              />
            </Box>
          )}
          {data?.length > 0 && (
            <>
              <TableContainer sx={{ mt: 1 }}>
                <Table stickyHeader>
                  <TableHeader
                    selectedColumns={selectedColumns}
                    columns={Object.keys(data[0])}
                    isMessage={isMessage}
                    hasAttachment={hasAttachment}
                    showActions={isEditable || isDeletable}
                  />
                  <TableBodyComponent
                    data={paginatedData}
                    columns={Object.keys(data[0])}
                    selectedColumns={selectedColumns}
                    editingRowIndex={editingRowIndex}
                    setEditingRowIndex={setEditingRowIndex}
                    editingData={editingData}
                    setEditingData={setEditingData}
                    setData={setData}
                    isEditable={isEditable}
                    isDeletable={isDeletable}
                    isMessage={isMessage}
                    targetPoint={targetPoint}
                    deleteKey={deleteKey}
                    hasAttachment={hasAttachment}
                    attachmentLink={attachmentLink}
                  />
                </Table>
              </TableContainer>

              <TablePaginationComponent
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Box>
      </Paper>
    );
  },
);

export default IPDCFinalTable;
