import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { FormValues } from "../shared/types";
import { Input } from "Components/Input/input";
import { useCallback, useMemo, useState } from "react";

import styles from "../shared/panels.module.scss";
import { debounce } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { UniversityType } from "Types/endpoint.types";
import axios from "axios";
import { ComboBox } from "Components/CompoBox/comboBox";

export const ReactHookFormPanel = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    alert(`Name: ${data.name}\nUniversity: ${data.uni || "Not selected"}`);
  };
  const [search, setSearch] = useState("");
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
      <h2>Form with React Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          label="First Name"
          required
          placeholder="Name"
          register={register}
          errorMessage={errors.name?.message}
        />
        <ComboBox
          name="uni"
          label="University"
          options={options}
          onSearchChange={debouncedSetSearch}
          isLoading={isPending}
          control={control}
          errorMessage={errors.uni?.message}
        />
        <button className={styles.btn} type="submit">
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
};

export default ReactHookFormPanel;
