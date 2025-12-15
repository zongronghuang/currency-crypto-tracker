import { useState } from "react";
import { z } from "zod";
import { CircleFlag } from "react-circle-flags";
import { validateComponentProps } from "@/utils";

const IconSchema = z.object({
  className: z.string(),
  code: z.string(),
  alt: z.string(),
  title: z.string(),
  fetchPriority: z.enum(["low", "high", "auto"]).optional(),
  loading: z.enum(["eager", "lazy"]).optional(),
  backupSrc: z.string().optional(),
});

type IconProps = z.infer<typeof IconSchema>;

export const FiatIcon = ({
  code,
  alt,
  title,
  className,
  fetchPriority = "low",
  loading = "lazy",
}: IconProps) => {
  validateComponentProps(IconSchema, {
    code,
    alt,
    title,
    className,
    fetchPriority,
    loading,
  });

  return (
    <CircleFlag
      fetchPriority={fetchPriority}
      loading={loading}
      className={className}
      alt={alt}
      title={title}
      countryCode={code.toLowerCase()}
    />
  );
};

export const CryptoIcon = ({
  code,
  alt,
  title,
  className,
  fetchPriority = "low",
  loading = "lazy",
  backupSrc = "src/assets/fallback_crypto.svg",
}: IconProps) => {
  const [cryptoIconSrc, setCryptoIconSrc] = useState(
    `src/assets/color/${code.toLowerCase()}.svg`,
  );

  validateComponentProps(IconSchema, {
    code,
    alt,
    title,
    className,
    fetchPriority,
    loading,
    backupSrc,
  });

  return (
    <img
      alt={alt}
      title={title}
      className={className}
      src={cryptoIconSrc}
      fetchPriority={fetchPriority}
      loading={loading}
      onError={() => {
        setCryptoIconSrc(backupSrc);
      }}
    />
  );
};
