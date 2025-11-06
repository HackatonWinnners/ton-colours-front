import { CustomPicker, InjectedColorProps } from "react-color";
import { Saturation, Hue } from "react-color/lib/components/common";

type Props = {
  className?: string;
};

function BasePicker(props: Props & InjectedColorProps) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ position: "relative", width: "100%", height: 180 }}>
        <Saturation {...props} onChange={props.onChange!} />
      </div>
      <div style={{ position: "relative", width: "100%", height: 16 }}>
        <Hue {...props} onChange={props.onChange!} direction="horizontal" />
      </div>
    </div>
  );
}

export default CustomPicker(BasePicker);
