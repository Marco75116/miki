"use client";
import React from "react";
import { useQuery, gql } from "@apollo/client";

const TRANSFERS_QUERY = gql`
  query MyQuery {
    transfers {
      from
      id
      to
      value
    }
  }
`;

interface Transfer {
	id: string;
	from: string;
	to: string;
	value: string;
}

interface TransfersData {
	transfers: Transfer[];
}

const Transfers = () => {
	const { loading, error, data } = useQuery<TransfersData>(TRANSFERS_QUERY);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :{error.message}</p>;

	return (
		<div>
			<h1>Transfers</h1>
			<ul>
				{data?.transfers.map(({ id, from, to, value }) => (
					<li key={id}>{`From: ${from}, To: ${to}, Value: ${value}`}</li>
				))}
			</ul>
		</div>
	);
};

export default Transfers;
