import html2pdf from "html2pdf.js";

export class BillGenerator {
  static formatBillData(billRecord) {
    console.log("Processing bill record:", billRecord);

    const [fromDate, toDate] = [
      new Date(
        billRecord.billing.from || billRecord.billing.billingPeriod?.from
      ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      new Date(
        billRecord.billing.to || billRecord.billing.billingPeriod?.to
      ).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    ];

    const cleanAmount = billRecord.amount.replace(/[₱\s]/g, "");
    const presentBillAmount = parseFloat(cleanAmount);

    const consumption = billRecord.consumption.replace(" m³", "");

    return {
      name: billRecord.consumerName,
      billingDate: toDate,
      dueDate: billRecord.dueDate,
      previousDate: fromDate,
      previousRead: billRecord.prevReading,
      presentDate: toDate,
      presentRead: billRecord.currReading,
      consumption: `${consumption} m³`,
      readType: "actual",
      meterDescription: "water",
      presentBill: `₱${presentBillAmount.toFixed(2)}`,
      previousBalance: "₱0.00",
      otherCharges: "₱0.00",
      totalBill: `₱${presentBillAmount.toFixed(2)}`,
    };
  }

  static getPdfOptions() {
    return {
      margin: 0,
      filename: "water_bills.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        letterRendering: true,
        useCORS: true,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    };
  }

  static async generatePDF(container) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "0";
      tempContainer.innerHTML = container.innerHTML;
      document.body.appendChild(tempContainer);

      const style = document.createElement("style");
      style.textContent = `
        .bill-container {
          width: 8.5in;
          height: 11in;
          padding: 0;
          position: relative;
          background-color: white;
          page-break-after: always;
        }
        .bill-wrapper {
          height: 5.5in;
          position: relative;
        }
        .dash-separator {
          width: 100%;
          height: 0;
          border-top: 2px dashed #000;
          position: absolute;
          top: 5.5in;
          left: 0;
        }
        @page {
          size: letter portrait;
          margin: 0;
        }
      `;
      tempContainer.appendChild(style);

      await html2pdf().set(this.getPdfOptions()).from(container).save();
      return true;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return false;
    }
  }
}
