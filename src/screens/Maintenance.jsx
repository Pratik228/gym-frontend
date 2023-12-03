import React from "react";
import { Typography } from "@mui/material";
const Maintenance = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen  text-center p-4">
			<img
				src="/img/maintenance.png"
				alt="Under Maintenance"
				className="w-1/2 max-w-lg mb-8"
			/>
			<Typography
				variant="h5"
				className="mb-2">
				We are Under Maintenance.
			</Typography>
			<Typography variant="subtitle1">Will be Back Soon!</Typography>
		</div>
	);
};

export default Maintenance;
