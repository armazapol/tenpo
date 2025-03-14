import { useGetUsers } from "@/services";
import {
  Table,
  Box,
  Flex,
  HStack,
  Skeleton,
  Alert,
  Input,
} from "@chakra-ui/react"; // Importar componentes de Chakra UI
import { InputGroup } from "@/components/ui/input-group"
import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { ResponsePhotos } from "@/types";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { LuSearch } from "react-icons/lu"

const Home = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [globalFilter, setGlobalFilter] = useState(""); // Estado para el filtro global

  const { data, isLoading, isError } = useGetUsers();

  const columns: ColumnDef<ResponsePhotos>[] = useMemo(
    () => [
      {
        header: "Id",
        accessorKey: "id",
      },
      {
        header: "Titulo",
        accessorKey: "title",
      },
      {
        header: "Url",
        accessorKey: "url",
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: data || [],
    // debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: (filterValue) => {
      setGlobalFilter(filterValue); // Actualizar el filtro global
      setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reiniciar el paginado
    },
    state: {
      pagination,
      globalFilter, // Añadir el filtro global al estado
    },
  });

  return (
    <Flex justifyContent="center" mt={["10px", "50px"]}>
      <Box width="800px" overflowX="auto">
        {isError ? (
          // Mostrar alerta de error si hay un error
          <Alert.Root status="error" borderRadius="md">
            <Alert.Indicator />
            <Alert.Title>
              No se pudieron cargar los datos. Por favor, inténtalo de nuevo más
              tarde.
            </Alert.Title>
          </Alert.Root>
        ) : isLoading ? (
          <Box>
            {[...Array(pagination.pageSize)].map((_, index) => (
              <Skeleton key={index} height="40px" my="2" />
            ))}
          </Box>
        ) : (
          <>
            {/* Input de búsqueda */}
            <InputGroup mb={4}  startElement={<LuSearch />}>

              <Input
                placeholder="Buscar..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)} // Actualizar el filtro global
              />
            </InputGroup>

            <Table.Root size={["sm", "md"]}>
              <Table.Header>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Table.Row
                    key={headerGroup.id}
                    css={{
                      background: "gray.800",
                    }}
                  >
                    {headerGroup.headers.map((header) => (
                      <Table.ColumnHeader key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </Table.ColumnHeader>
                    ))}
                  </Table.Row>
                ))}
              </Table.Header>
              <Table.Body>
                {table.getRowModel().rows.map((row) => (
                  <Table.Row
                    key={row.id}
                    css={{
                      background: "gray.50",
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <Table.Cell
                        key={cell.id}
                        css={{
                          borderColor: "gray.200",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
            <PaginationRoot
              page={pagination.pageIndex + 1}
              // count={data?.length || 0}
              count={table.getFilteredRowModel().rows.length}
              pageSize={pagination.pageSize}
              onPageChange={(e) =>
                setPagination({
                  ...pagination,
                  pageIndex: e.page - 1,
                })
              }
            >
              <HStack>
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
              </HStack>
            </PaginationRoot>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Home;