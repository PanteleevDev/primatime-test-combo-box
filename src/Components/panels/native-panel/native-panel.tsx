import { validateFields, required } from "Funcs/validation";
import { debounce, isBoolean } from "lodash";
import { useState, FormEvent, useCallback, useMemo } from "react";
import { Input } from "Components/Input/input";

import styles from "../shared/panels.module.scss";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { UniversityType } from "Types/endpoint.types";
import { ComboBox } from "Components/CompoBox/comboBox";

export const NativePanel = () => {
  const [disabled, setDisabled] = useState(false);

  const [nativeFormData, setNativeFormData] = useState({ name: "", uni: "" });
  const [search, setSearch] = useState("");
  const [nativeErrors, setNativeErrors] = useState<{
    name?: string;
    uni?: string;
  }>({});

  const handleInputChange = (name: string, value: unknown) => {
    setNativeFormData((prev) => ({ ...prev, [name]: value }));
  };
  const nativeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkRes = validateFields(nativeFormData, {
      name: [required],
    });
    if (isBoolean(checkRes)) {
      setNativeErrors({});
      alert(JSON.stringify(nativeFormData));
    } else {
      setNativeErrors(checkRes);
    }
  };

  const { isPending, data } = useQuery<UniversityType[]>({
    queryKey: ["repoData", search],
    queryFn: async () => {
      const { data } = await axios(
        `http://universities.hipolabs.com/search?country=Czech+Republic`,
        { params: { name: search } }
      );
      return data;
    },
  });

  const debouncedSetSearch = useCallback(
    debounce((value) => setSearch(value), 300),
    []
  );
  const options = useMemo(() => data?.map((el) => el.name), [data]);

  return (
    <div className={styles.container}>
      <h2>Native form</h2>
      <button onClick={() => setDisabled((prev) => !prev)}>
        Toggle disabled
      </button>
      <form onSubmit={nativeSubmit}>
        <Input
          name="name"
          label="First Name"
          required
          disabled={disabled}
          placeholder="Name"
          value={nativeFormData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          errorMessage={nativeErrors.name}
        />
        <ComboBox
          name="uni"
          label="University"
          options={options}
          onSearchChange={debouncedSetSearch}
          isLoading={isPending}
          onChange={(val) => handleInputChange("uni", val)}
          disabled={disabled}
        />
        <button className={styles.btn} type="submit">
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
};

export default NativePanel;
