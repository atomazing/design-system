
type AplaiLeadFormModal = {
  readonly patternId: string;
  readonly title: string;
  readonly lead: string;
  readonly riskBadgeLabel: string;
  readonly closeLabel: string;
};

export const APLAI_LEAD_FORM_MODAL: AplaiLeadFormModal = {
  patternId: "lead_form_modal",
  title: "Запросить демо APLAI",
  lead: "10-15 минут: покажем путь 1-5-60 и обсудим ваш сценарий.",
  riskBadgeLabel: "Без vendor-lock",
  closeLabel: "Закрыть",
};
