import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandeDevisService } from 'src/app/services/Client/demande-devis.service';
import { DetailDemandeDevisService } from 'src/app/services/Client/detail-demande-devis.service';
import { CardComponent } from "../../theme/shared/components/card/card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EntreePieceService } from 'src/app/services/Manager/entree-piece.service';
import { StockPieceService } from 'src/app/services/Manager/stock-piece.service';
import { ServiceService } from 'src/app/services/Manager/service.service';
import { MarqueVoitureService } from 'src/app/services/Manager/marque-voiture.service';
import { AnneeVoitureService } from 'src/app/services/Manager/annee-voiture.service';
import { GenerationVoitureService } from 'src/app/services/Manager/generation-voiture.service';
import { ModeleVoitureService } from 'src/app/services/Manager/modele-voiture.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
declare let bootstrap: any;
@Component({
  selector: 'app-details-demande-devis',
  imports: [CardComponent,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './details-demande-devis.component.html',
  styleUrl: './details-demande-devis.component.scss',
  providers: [DemandeDevisService,
    DetailDemandeDevisService,
    EntreePieceService,
    StockPieceService
  ]
})
export class DetailsDemandeDevisComponent {
  idDemande: string = '';
  listeDemandedevis: any[] = [];
  listeDetailDemandedevis: any[] = [];
  listeDetailPieceDemande: any[] = [];
  constructor(private route: ActivatedRoute,
    private demandeDevisService: DemandeDevisService,
    private detailDemandeService: DetailDemandeDevisService,
    private entreeService: EntreePieceService,
    private stockPieceService: StockPieceService
  ) { }

  ngOnInit(): void {
    this.idDemande = (this.route.snapshot.paramMap.get('idDemandeDevis'));
    this.loadDemandeDevis();
    this.loadDetailDemandeDevis();
    this.loadDetailPieceDemandeDevis();
    this.getTotalPiece();
    this.getTotalService();
    this.getTotalServiceApres();
  }


  listeIdSevice: any[] = [];
  noteTotal: number = 0;
  heureFini: string ='00';
  minuteFini: string ='00';
  loadDemandeDevis(): void {
    this.demandeDevisService.getDemandeDevisById(this.idDemande).subscribe(data => {
      this.listeDemandedevis = data;
      this.noteTotal = parseFloat((
        (this.listeDemandedevis[0]?.idVoitureClient?.idMarque?.note +
          this.listeDemandedevis[0]?.idVoitureClient?.idAnnee?.note +
          this.listeDemandedevis[0]?.idVoitureClient?.idModele?.note +
          this.listeDemandedevis[0]?.idVoitureClient?.idGeneration?.note) / 4
      ).toFixed(2));
      this.heureFini = this.listeDemandedevis[0]?.heureFini;
      this.minuteFini = this.listeDemandedevis[0]?.minuteFini;
    });
  }

  listeService: any[] = [];
  loadDetailDemandeDevis(): void {
    this.detailDemandeService.getDetailDemandeDevisById(this.idDemande).subscribe(data => {
      this.listeDetailDemandedevis = data;

    });
  }

  getTotalPiece(): number {
    return this.listeDetailPieceDemande.reduce((total, piece) => {
      return total + (piece.prixUnitairePiece * piece.qte);
    }, 0);
  }

  getTotalService(): number {
    return this.listeDetailDemandedevis.reduce((total, service) => {
      return total +  (service.idService.prixBase * this.noteTotal) * service.qte;
    }, 0);
  }

  getTotalServiceApres(): number {
    return this.listeDetailDemandedevis.reduce((total, service) => {
      return total + (service.prixBaseService * this.noteTotal) * service.qte;
    }, 0);
  }

  getTotalDevisAvant(): number {
    return this.getTotalPiece()+this.getTotalService();
  }

  getTotalDevisApres(): number {
    return this.getTotalPiece()+this.getTotalServiceApres();
  }


  loadDetailPieceDemandeDevis(): void {
    this.detailDemandeService.getDetailPieceDemandeDevisById(this.idDemande).subscribe(data => this.listeDetailPieceDemande = data);
  }


  pieceSelectionnee: any = null;
  pieceSuggestions: any[] = [];
  piece: string = '';
  idPiece: string = '';
  prixPiece: number = 0;
  nombereStock: number = 0;
  listeStockByPiece: any[] = [];
  nombreSortie: number = 1;
  searchPiece() {
    if (this.piece.length > 1) {
      this.entreeService.searchPiece(this.piece).subscribe(
        (data) => {
          this.pieceSuggestions = data;
        },
        (error) => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
    } else {
      this.pieceSuggestions = [];
    }
  }

  selectSuggestionPiece(piece1: any) {
    this.piece = piece1.nomPiece + "(" + piece1.referencePiece + ")";
    this.idPiece = piece1._id;
    this.pieceSelectionnee = piece1.nomPiece;
    this.pieceSuggestions = [];

    this.stockPieceService.getStockPieceByPiece(this.idPiece).subscribe(data => {
      this.listeStockByPiece = data;

      if (this.listeStockByPiece.length > 0) {
        this.prixPiece = this.listeStockByPiece[0].prixTotal;
        this.nombereStock = this.listeStockByPiece[0].qte;
        // this.prixTotalPiece = (this.prixUnitaire) * (this.nombereStock);
      } else {
        this
        console.warn("Aucun stock trouvé pour cette pièce.");
      }
    });
  }

  piecesAjoutees: any[] = [];
  ajouterPiece() {
    if (!this.piece) {
      alert('Veuillez remplir tous les champs avant d’ajouter.');
      return;
    }

    this.piecesAjoutees.push({
      piece: this.piece,
      idPiece: this.idPiece,
      prixUnitairePiece: this.prixPiece,
      nombre: this.nombreSortie
    });


    this.piece = '';
    this.idPiece = '';
    this.nombreSortie = 1;
    this.prixPiece = 0;
    this.pieceSelectionnee = null;
  }

  supprimerPiece(index: number) {
    this.piecesAjoutees.splice(index, 1);
  }

  messageErreur: string = '';

  verificationNbStock() {
    if (this.nombreSortie > this.nombereStock) {
      this.messageErreur = 'Stock insuffisant(reste:' + this.nombereStock + ')';
    } else {
      this.messageErreur = '';
    }
  }



  addPieceDemandeDevis(): void {
    this.demandeDevisService.ajoutPieceDemandeDevis(this.heureFini, this.minuteFini, this.idDemande, this.piecesAjoutees, this.noteTotal, this.listeDetailDemandedevis).subscribe(() => {
      this.loadDetailDemandeDevis();
      this.loadDemandeDevis();
      this.piecesAjoutees=[];

    });
  }

  openModalVoirDevis() {
    const modalElement = document.getElementById('devisModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }


  // exportAsPDF() {
  //   const element = document.getElementById('pdfContent'); // Sélectionne l'élément à exporter

  //   if (element) {
  //     html2canvas(element, { scale: 2 }).then(canvas => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimètres, format A4

  //       const imgWidth = 210; // Largeur A4 en mm
  //       const pageHeight = 297; // Hauteur A4 en mm
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //       let heightLeft = imgHeight;
  //       let position = 0;

  //       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;

  //       while (heightLeft > 0) {
  //         position = heightLeft - imgHeight;
  //         pdf.addPage();
  //         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //         heightLeft -= pageHeight;
  //       }

  //       pdf.save('export.pdf'); // Téléchargement du fichier
  //     });
  //   }
  // }


  envoieDevisMail() {
    const element = document.getElementById('pdfDevis');

    if (element) {
        html2canvas(element, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            const pdfBlob = pdf.output('blob');

            const formData = new FormData();
            formData.append('to', 'randrianoely2512@gmail.com'); // Mettre l'email du destinataire
            formData.append('subject', 'Votre PDF');
            formData.append('text', 'Veuillez trouver ci-joint le fichier PDF.');
            formData.append('attachment', pdfBlob, 'devis.pdf');

            this.demandeDevisService.envoieMail(formData).subscribe(() => {

            });
        });
    }
}


}
