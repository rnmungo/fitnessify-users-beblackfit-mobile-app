import { Text, useTheme } from "react-native-paper";

interface CopyrightProps {
  company: string;
  startYear: number;
}

const Copyright = ({ company, startYear }: CopyrightProps) => {
  const theme = useTheme();
  const actualYear = new Date().getFullYear();

  return (
    <Text variant="labelSmall" style={{ color: theme.colors.onSurfaceVariant }}>
      {`© ${startYear}-${actualYear} ${company}`}
    </Text>
  );
};

export default Copyright;
