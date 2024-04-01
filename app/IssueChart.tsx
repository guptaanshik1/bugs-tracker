"use client";

import { IIssueCount } from "@/utils/client/data/IssueCount";
import { getStatusChartMapper } from "@/utils/client/statusSummaryMapper";
import { Card } from "@radix-ui/themes";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const IssueChart = ({ open, closed, inProgress }: IIssueCount) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={getStatusChartMapper(4, 5, 6)}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
