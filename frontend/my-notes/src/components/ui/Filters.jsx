import { Input, Select } from "@chakra-ui/react";

export default function Filters({ filter, setFilter }) {
  return (
    <div className="flex flex-col gap-5">
      <Input
        placeholder="Поиск"
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
      />
      <Select
        value={filter.sortOrder}
        onChange={(e) => setFilter({ ...filter, sortOrder: e.target.value })}
      >
        <option value="desc">Сначала новые</option>
        <option value="asc">Сначала старые</option>
      </Select>
    </div>
  );
}