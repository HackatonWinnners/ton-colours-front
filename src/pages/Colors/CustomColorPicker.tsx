import { CustomPicker, InjectedColorProps } from "react-color";
import { Saturation, Hue } from "react-color/lib/components/common";

type Props = {
  className?: string;
};

function BasePicker(props: Props & InjectedColorProps) {
  const HuePointer = () => (
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        boxShadow: "0 0 0 2px #fff, 0 0 0 4px rgba(0,0,0,0.25)",
        
        background: "#fff",
      }}
    />
  );
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
      <div style={{ position: "relative", width: "100%", height: 20 }}>
        <Hue
          {...props}
          onChange={props.onChange!}
          direction="horizontal"
          pointer={HuePointer}
        />
      </div>
    </div>
  );
}

export default CustomPicker(BasePicker);
