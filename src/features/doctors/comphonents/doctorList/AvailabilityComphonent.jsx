import React from "react";

const AvailabilityComphonent = ({ availability }) => {
  return (
    <td>
      {availability
        .map(
          (slot) =>
            `${slot.day} ${
              slot.fromHour > 10 ? slot.fromHour : "0" + slot.fromHour
            }:${slot.fromMinute < 10 ? "0" : ""}${slot.fromMinute}–${
              slot.toHour
            }:${slot.toMinute < 10 ? "0" : ""}${slot.toMinute}`
        )
        .join(", ")}
    </td>
  );
};

export default AvailabilityComphonent;
