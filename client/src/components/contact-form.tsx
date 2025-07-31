import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-context';

// Funkcija koja vraća odgovarajuće poruke o greškama na osnovu jezika
const getValidationMessages = (lang: string) => {
  switch (lang) {
    case 'en':
      return {
        nameRequired: 'Name must be at least 2 characters',
        emailInvalid: 'Please enter a valid email address',
        subjectRequired: 'Subject must be at least 3 characters',
        messageRequired: 'Message must be at least 10 characters'
      };
    case 'sq':
      return {
        nameRequired: 'Emri duhet të ketë së paku 2 karaktere',
        emailInvalid: 'Ju lutemi shkruani një adresë email të vlefshme',
        subjectRequired: 'Tema duhet të ketë së paku 3 karaktere',
        messageRequired: 'Mesazhi duhet të ketë së paku 10 karaktere'
      };
    case 'bs':
      return {
        nameRequired: 'Ime mora imati najmanje 2 karaktera',
        emailInvalid: 'Molimo unesite ispravnu email adresu',
        subjectRequired: 'Predmet mora imati najmanje 3 karaktera',
        messageRequired: 'Poruka mora imati najmanje 10 karaktera'
      };
    case 'de':
      return {
        nameRequired: 'Name muss mindestens 2 Zeichen lang sein',
        emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
        subjectRequired: 'Betreff muss mindestens 3 Zeichen lang sein',
        messageRequired: 'Nachricht muss mindestens 10 Zeichen lang sein'
      };
    case 'it':
      return {
        nameRequired: 'Il nome deve contenere almeno 2 caratteri',
        emailInvalid: 'Inserisci un indirizzo email valido',
        subjectRequired: 'L\'oggetto deve contenere almeno 3 caratteri',
        messageRequired: 'Il messaggio deve contenere almeno 10 caratteri'
      };
    default:
      return {
        nameRequired: 'Name must be at least 2 characters',
        emailInvalid: 'Please enter a valid email address',
        subjectRequired: 'Subject must be at least 3 characters',
        messageRequired: 'Message must be at least 10 characters'
      };
  }
};

// Dinamička shema za validaciju forme koja koristi jezik
const createFormSchema = (lang: string) => {
  const messages = getValidationMessages(lang);
  
  return z.object({
    name: z.string().min(2, { message: messages.nameRequired }),
    email: z.string().email({ message: messages.emailInvalid }),
    subject: z.string().min(3, { message: messages.subjectRequired }),
    message: z.string().min(10, { message: messages.messageRequired })
  });
};

type ContactFormProps = {
  onClose: () => void;
  recipientEmail: string;
};

export function ContactForm({ onClose, recipientEmail }: ContactFormProps) {
  const { currentLanguage } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [emailDeliveryStatus, setEmailDeliveryStatus] = useState<boolean>(true);

  // Kreiraj šemu za validaciju forme na osnovu trenutnog jezika
  const localFormSchema = createFormSchema(currentLanguage);
  
  // Definišemo tip za formu na osnovu naše šeme
  type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

  const form = useForm<FormValues>({
    resolver: zodResolver(localFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // Šalje kontakt formu na server
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          recipientEmail
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Prikaži detalje greške u konzoli
        console.error('Server error details:', data);
        throw new Error(data.message || 'Something went wrong');
      }

      // Proveravamo da li je e-mail zaista isporučen
      setEmailDeliveryStatus(data.emailDelivered === true);
      
      // Prikaži uspešnu poruku
      setFormSuccess(true);
      
      toast({
        title: currentLanguage === 'en' ? 'Message Sent!' : 
               currentLanguage === 'sq' ? 'Mesazhi u dërgua!' :
               currentLanguage === 'de' ? 'Nachricht gesendet!' :
               currentLanguage === 'it' ? 'Messaggio inviato!' :
               'Poruka poslana!',
        description: currentLanguage === 'en' ? 'We will get back to you soon.' : 
                     currentLanguage === 'sq' ? 'Do të ju përgjigjemi së shpejti.' :
                     currentLanguage === 'de' ? 'Wir werden uns bald bei Ihnen melden.' :
                     currentLanguage === 'it' ? 'Ti risponderemo presto.' :
                     'Javit ćemo vam se uskoro.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: currentLanguage === 'en' ? 'Error' : 
               currentLanguage === 'sq' ? 'Gabim' :
               currentLanguage === 'de' ? 'Fehler' :
               currentLanguage === 'it' ? 'Errore' :
               'Greška',
        description: currentLanguage === 'en' ? 'Failed to send message. Please try again later.' : 
                     currentLanguage === 'sq' ? 'Dërgimi i mesazhit dështoi. Ju lutemi provoni përsëri më vonë.' :
                     currentLanguage === 'de' ? 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.' :
                     currentLanguage === 'it' ? 'Impossibile inviare il messaggio. Riprova più tardi.' :
                     'Slanje poruke nije uspjelo. Molimo pokušajte kasnije.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Ako je poruka uspešno poslata, prikaži potvrdu
  if (formSuccess) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-100">
            <Icon name="check_circle" className="text-4xl text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentLanguage === 'en' ? 'Message Received!' : 
             currentLanguage === 'sq' ? 'Mesazhi u pranua!' :
             currentLanguage === 'de' ? 'Nachricht empfangen!' :
             currentLanguage === 'it' ? 'Messaggio ricevuto!' :
             'Poruka primljena!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {emailDeliveryStatus ? (
              // Poruka ako je e-mail uspešno isporučen
              currentLanguage === 'en' ? 'Thank you for contacting us. We will get back to you soon.' : 
              currentLanguage === 'sq' ? 'Faleminderit që na kontaktuat. Do të ju përgjigjemi së shpejti.' :
              currentLanguage === 'de' ? 'Vielen Dank für Ihre Kontaktaufnahme. Wir werden uns bald bei Ihnen melden.' :
              currentLanguage === 'it' ? 'Grazie per averci contattato. Ti risponderemo presto.' :
              'Hvala vam što ste nas kontaktirali. Javit ćemo vam se uskoro.'
            ) : (
              // Poruka ako e-mail nije isporučen, ali poruka je primljena
              currentLanguage === 'en' ? 'We have received your message, but our email system is currently experiencing issues. Your inquiry is important to us, and we will still process it.' : 
              currentLanguage === 'sq' ? 'Kemi marrë mesazhin tuaj, por sistemi ynë i postës elektronike aktualisht po has probleme. Kërkesa juaj është e rëndësishme për ne dhe ne do ta përpunojmë atë.' :
              currentLanguage === 'de' ? 'Wir haben Ihre Nachricht erhalten, aber unser E-Mail-System hat derzeit Probleme. Ihre Anfrage ist uns wichtig, und wir werden sie trotzdem bearbeiten.' :
              currentLanguage === 'it' ? 'Abbiamo ricevuto il tuo messaggio, ma il nostro sistema di posta elettronica sta attualmente riscontrando problemi. La tua richiesta è importante per noi e la elaboreremo comunque.' :
              'Primili smo vašu poruku, ali naš email sistem trenutno ima problema. Vaš upit nam je važan i svejedno ćemo ga obraditi.'
            )}
          </p>
          <Button 
            onClick={onClose} 
            variant="default"
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {currentLanguage === 'en' ? 'Close' : 
             currentLanguage === 'sq' ? 'Mbyll' :
             currentLanguage === 'de' ? 'Schließen' :
             currentLanguage === 'it' ? 'Chiudi' :
             'Zatvori'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {currentLanguage === 'en' ? 'Contact Us' : 
           currentLanguage === 'sq' ? 'Na Kontaktoni' :
           currentLanguage === 'de' ? 'Kontaktiere uns' :
           currentLanguage === 'it' ? 'Contattaci' :
           'Kontaktirajte nas'}
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="h-8 w-8 p-0 rounded-full"
        >
          <Icon name="close" />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {currentLanguage === 'en' ? 'Name' : 
                   currentLanguage === 'sq' ? 'Emri' :
                   currentLanguage === 'de' ? 'Name' :
                   currentLanguage === 'it' ? 'Nome' :
                   'Ime'}
                </FormLabel>
                <FormControl>
                  <Input placeholder={
                    currentLanguage === 'en' ? 'Enter your name' : 
                    currentLanguage === 'sq' ? 'Shëno emrin tënd' :
                    currentLanguage === 'de' ? 'Geben Sie Ihren Namen ein' :
                    currentLanguage === 'it' ? 'Inserisci il tuo nome' :
                    'Unesite vaše ime'
                  } {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {currentLanguage === 'en' ? 'Email' : 
                   currentLanguage === 'sq' ? 'Email' :
                   currentLanguage === 'de' ? 'E-Mail' :
                   currentLanguage === 'it' ? 'Email' :
                   'Email'}
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder={
                    currentLanguage === 'en' ? 'Enter your email' : 
                    currentLanguage === 'sq' ? 'Shëno email-in tënd' :
                    currentLanguage === 'de' ? 'Geben Sie Ihre E-Mail-Adresse ein' :
                    currentLanguage === 'it' ? 'Inserisci la tua email' :
                    'Unesite vaš email'
                  } {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {currentLanguage === 'en' ? 'Subject' : 
                   currentLanguage === 'sq' ? 'Tema' :
                   currentLanguage === 'de' ? 'Betreff' :
                   currentLanguage === 'it' ? 'Oggetto' :
                   'Predmet'}
                </FormLabel>
                <FormControl>
                  <Input placeholder={
                    currentLanguage === 'en' ? 'Subject of your message' : 
                    currentLanguage === 'sq' ? 'Tema e mesazhit tënd' :
                    currentLanguage === 'de' ? 'Betreff Ihrer Nachricht' :
                    currentLanguage === 'it' ? 'Oggetto del tuo messaggio' :
                    'Predmet vaše poruke'
                  } {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {currentLanguage === 'en' ? 'Message' : 
                   currentLanguage === 'sq' ? 'Mesazhi' :
                   currentLanguage === 'de' ? 'Nachricht' :
                   currentLanguage === 'it' ? 'Messaggio' :
                   'Poruka'}
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={
                      currentLanguage === 'en' ? 'Write your message here...' : 
                      currentLanguage === 'sq' ? 'Shkruaj mesazhin tënd këtu...' :
                      currentLanguage === 'de' ? 'Schreiben Sie Ihre Nachricht hier...' :
                      currentLanguage === 'it' ? 'Scrivi qui il tuo messaggio...' :
                      'Napišite vašu poruku ovdje...'
                    } 
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Icon name="sync" className="mr-2 animate-spin" />
                {currentLanguage === 'en' ? 'Sending...' : 
                 currentLanguage === 'sq' ? 'Duke dërguar...' :
                 currentLanguage === 'de' ? 'Wird gesendet...' :
                 currentLanguage === 'it' ? 'Invio in corso...' :
                 'Slanje...'}
              </>
            ) : (
              <>
                <Icon name="send" className="mr-2" />
                {currentLanguage === 'en' ? 'Send Message' : 
                 currentLanguage === 'sq' ? 'Dërgo Mesazhin' :
                 currentLanguage === 'de' ? 'Nachricht senden' :
                 currentLanguage === 'it' ? 'Invia messaggio' :
                 'Pošalji poruku'}
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}