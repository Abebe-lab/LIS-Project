import React from "react";
import { Route } from "react-router-dom";
import FinanceDashboard from "../../../pages/Views/CorporateResource/FinanceDashboard";
import {
	ArrearReports,
	FinancialReport,
	PaymentsDueAlert,
	UncollectedReport,
	FinancialSummaryReport,
} from "../../../pages/Views/CorporateResource/FinanceView/Reports";
import CollectPayment from "../../../pages/Views/CorporateResource/FinanceView/Forms/CollectPayment";
import FinanceRuleSettingsForm from "../../../pages/Views/CorporateResource/Head/Forms/FinanceRuleSettingsForm";
import ImportExistingCollection from "../../../pages/Views/CorporateResource/Head/ImportExistingCollection";

export default function CorporateReourceHeadRoutes() {
	return (
		<>
			<Route path="/" element={<FinanceDashboard />} />
			<Route path="/arrear" element={<ArrearReports />} />
			<Route path="/collectPayment" element={<CollectPayment />} />
			<Route path="/financeSummary" element={<FinancialSummaryReport />} />
			<Route path="/financialReports" element={<FinancialReport />} />
			<Route path="/paymentsDue" element={<PaymentsDueAlert />} />
			<Route path="/uncollected" element={<UncollectedReport />} />
			<Route path="/financeRule" element={<FinanceRuleSettingsForm />} />
			<Route path="/importExistingCollection" element={<ImportExistingCollection />} />
			
		</>
	);
}
